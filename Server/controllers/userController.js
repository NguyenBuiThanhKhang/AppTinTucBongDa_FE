const User = require("../models/Users");
const {encoding} = require("../utils/suport");
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Vui lòng nhập đầy đủ tài khoản và mật khẩu' });
        }
        const user = await User.findOne({ username: username, password: encoding(password)});
        const userResponseError ={
            userID : -1,
            username : "ERROR"
        }
        if (!user) {
            return res.status(401).json(
                { message: 'Tên đăng nhập hoặc mật khẩu không chính xác', data: userResponseError});
        }

        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET || 'secrect_key',
            { expiresIn: '1d' }
        );

        const userResponse ={
            userID : user?._id,
            username : user?.username,
            savedArticles: user.savedArticles || []
        }
        res.status(200).json({ message: 'Đăng nhập thành công', data: userResponse, token: accessToken });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi Server', error: error.message });
    }
}
const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = new User({
            username: username,
            password: encoding(password),
            savedArticles: []
        });
        const userCheck = await User.findOne({ username: username});
        if(userCheck){
            return  res.status(400).json({ message: 'Tài khoản đã tồn tại'});
        }
        await newUser.save();
        const user = await User.findOne({ username: username, password: encoding(password)});
        const accessToken = jwt.sign(
            { userId: newUser._id }, 
            process.env.ACCESS_TOKEN_SECRET || 'secrect_key',
        );
        const userResponse ={
            userID : user?._id,
            username : user?.username,
            savedArticles: []
        }
        res.status(200).json({ message: 'Thành công', data: userResponse, token: accessToken });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi Server', error: error.message });
    }
}

const toggleSaveArticle = async (req, res) => {
    try {
        const userId = req.userId; 
        const { articleId } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User không tồn tại" });

        const index = user.savedArticles.indexOf(articleId);

        let isSaved = false;
        let message = "";

        if (index === -1) {
            user.savedArticles.push(articleId);
            isSaved = true;
            message = "Đã lưu bài viết";
        } else {
            user.savedArticles.splice(index, 1);
            isSaved = false;
            message = "Đã bỏ lưu bài viết";
        }

        await user.save();

        return res.json({ success: true, message, isSaved });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Lỗi server" });
    }
};
module.exports = {
    login,
    register,
    toggleSaveArticle
}