const MultilingualNewspaper = require('../models/MultilingualNewspaper');
const Article = require('../models/Article');
const mongoose = require("mongoose");
const {translateHTMLInternal} = require("../ApiGermini/apiGer");

const countryCode = ["English", "Spanish", "French"];

async function createMN(idArticle,cCode,content){
    try {
        const newMN = new MultilingualNewspaper({
            idArticle: idArticle,
            countryCode: cCode,
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
async function getNewsForClient(idArticle,codes){
    try {
        const news = getMNByArticleIdAndCountryCode(idArticle,codes);
        if (news){
            return news;
        }else{
            const newVi = await Article.findOne({_id: mongoose.Types.ObjectId(idArticle)});
            let content = newVi.content;
            content = translateHTMLInternal(content,)
            for (const code of codes) {
                await createMN(idArticle,code,content);
            }
        }
    } catch (error) {
        return [];
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function createMNDB(req, res) {
    try {
        const newspapers = await Article.find();

        for (const newspaper of newspapers) {
            const idArticle = newspaper._id;
            const content = newspaper.content;

            if (await getMNByArticleIdAndCountryCode(idArticle, "English")) {
                continue;
            }

            for (const code of countryCode) {
                const translated = await translateHTMLInternal(content, code);

                await createMN(idArticle, code, translated);

                console.log(`Đã tạo ${code} cho bài ${idArticle}`);

                await sleep(20000);
            }
        }

        return res.status(200).json({
            success: true,
            message: "Tạo cơ sở dữ liệu báo đa ngôn ngữ thành công"
        });
    } catch (error) {
        console.error("Lỗi khi tạo cơ sở dữ liệu báo đa ngôn ngữ:", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi server"
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
    getCountryCode
};