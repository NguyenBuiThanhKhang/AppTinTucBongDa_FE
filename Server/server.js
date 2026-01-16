const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Config
dotenv.config();
const app = express();

// Connect Database
connectDB();

const categoryRoutes = require('./routes/categoryRoutes');
const articleRoutes = require('./routes/articleRoutes');
const commentRoutes = require('./routes/commentRoutes');
const rateRoutes = require('./routes/rateRoutes');
// const matchRoutes = require('./routes/matchRoutes');
const videoRoutes = require('./routes/videoRoutes')
const mtlRoutes = require('./routes/MutiLangNewsRoutes');


const userRoutes = require('./routes/userRoutes');

// Middleware
app.use(express.json());
app.use(express.text({ type: "text/plain", limit: "20mb" }));
app.use(cors());

app.use('/api/categories', categoryRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/rates', rateRoutes);
// app.use('/api/matches', matchRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/mtl',mtlRoutes );
app.use('/api/user', userRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});