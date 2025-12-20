require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Article = require('./models/Article');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Đã kết nối MongoDB Atlas thành công!'))
    .catch(err => console.error('Lỗi kết nối MongoDB:', err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server đang chạy tại http://localhost:${PORT}`));