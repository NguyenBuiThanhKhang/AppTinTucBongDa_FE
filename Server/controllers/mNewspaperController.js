const MultilingualNewspaper = require('../models/MultilingualNewspaper');
const Article = require('../models/Article');
const mongoose = require("mongoose");
const {translateHTMLInternal} = require("../ApiGermini/apiGer");
const {getContentFromDB} = require("../utils/suport");
const {getNewspaperDetails, getNewspaperDetailsInter} = require("./articleController");
const Comment = require("../models/Comment");
const Rate = require("../models/Rate");

const countryCode = ["English", "Spanish", "French"];

async function createMN(idArticle,cCode,title,content){
    try {
        const newMN = new MultilingualNewspaper({
            idArticle: idArticle,
            countryCode: cCode,
            title: title,
            content: content.trim()
        });
        await newMN.save();
        return true;
    } catch (error) {
        return false;
    }
}
async function getMNByArticleIdAndCountryCode(idArticle,cCode){
    try {
        const mn = await MultilingualNewspaper.findOne({idArticle: idArticle, countryCode: cCode});
        return mn;
    } catch (error) {
        return null;
    }
}
async function getNewsForClient(idArticle, codes) {
    let mn = await MultilingualNewspaper.findOne({
        idArticle: idArticle,
        countryCode: codes
    });

    if (!mn) {
        const article = await Article.findById(idArticle);
        if (!article) {
            throw new Error("Không tìm thấy bài viết");
        }

        const translatedResult = await translateHTMLInternal(
            article.title,
            article.content
        );

        if (!translatedResult) {
            throw new Error("Dịch bài viết thất bại");
        }

        for (const code of ["English", "Spanish", "French"]) {
            await createMN(
                idArticle,
                code,
                translatedResult[code].title,
                translatedResult[code].html
            );
        }

        mn = await MultilingualNewspaper.findOne({
            idArticle: idArticle,
            countryCode: codes
        });
    }

    const comments = await Comment.find({ idArticle }).sort({ createdAt: -1 });
    const rates = await Rate.find({ idArticle });

    let totalRate = 0;
    rates.forEach(r => totalRate += Number(r.rate));
    totalRate = rates.length === 0 ? 0 : totalRate / rates.length;

    return {
        _id: idArticle,
        title: mn.title,
        introduction: "",
        content: getContentFromDB(mn.content),
        rate: {
            rate: totalRate
        },
        listComment: {
            listCmt: comments
        }
    };
}
async function getNews(req, res) {
    try {
        const { idArticle, codes } = req.body;

        if (codes === "VietNam") {
            const newspaper = await getNewspaperDetailsInter(idArticle);
            return res.status(200).json({
                success: true,
                data: newspaper
            });
        }

        const news = await getNewsForClient(idArticle, codes);
        return res.status(200).json({
            success: true,
            data: news
        });

    } catch (error) {
        console.error("Lỗi khi lấy báo đa ngôn ngữ:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Lỗi server"
        });
    }
}



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function createMNDB(req, res) {
    try {
        const existedIds = await MultilingualNewspaper
            .find({ countryCode: "English" })
            .distinct("idArticle");

        const newspapers = await Article.find({
            _id: { $nin: existedIds }
        });

        for (const newspaper of newspapers) {
            const idArticle = newspaper._id;
            const title = newspaper.title;
            const content = newspaper.content;

            const existed = await getMNByArticleIdAndCountryCode(idArticle, "English");
            if (existed) {
                continue;
            }else{
                await sleep(20000);
            }

            const translatedResult = await translateHTMLInternal(title, content);

            if (!translatedResult) {
                console.error(`Dịch thất bại bài ${idArticle}`);
                continue;
            }
            for (const code of ["English", "Spanish", "French"]) {
                await createMN(
                    idArticle,
                    code,
                    translatedResult[code].title,
                    translatedResult[code].html
                );

                console.log(`Đã tạo ${code} cho bài ${idArticle}`);
            }
        }

        return res.status(200).json({
            success: true,
            message: "End",
        });

    } catch (error) {
        console.error("Lỗi khi tạo cơ sở dữ liệu báo đa ngôn ngữ:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Lỗi server"
        });
    }
}

async function getCountryCode(req, res) {
    try {
        return res.status(200).json({
            success: true,
            data: countryCode
        });
    } catch (error) {
        console.error("Lỗi khi lấy mã quốc gia:", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi server"
        });
    }
}

module.exports = {
    createMNDB,
    getCountryCode,
    getNews
};