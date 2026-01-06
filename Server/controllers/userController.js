const User = require("../models/users");
const {encoding} = require("../utils/suport");

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
        const userResponse ={
            userID : user?._id,
            username : user?.username
        }
        res.status(200).json({ message: 'Đăng nhập thành công', data: userResponse });
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
        });
        await newUser.save();
        res.status(200).json({ message: 'Thành công', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi Server', error: error.message });
    }
}
module.exports = {
    login,
    register
}