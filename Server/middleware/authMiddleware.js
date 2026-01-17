const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'Không tìm thấy Token xác thực' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'secrect_key');
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({ success: false, message: 'Token không hợp lệ hoặc đã hết hạn' });
    }
};

module.exports = verifyToken;