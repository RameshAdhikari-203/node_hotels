const mongoose = require('mongoose');
require('dotenv').config();


//const mongoURL = process.env.db_urllocal;//'mongodb://localhost:27017/stedunt'
const mongoURL = process.env.db_url;


mongoose.connect(mongoURL,{
   // useNewUrlParser: true,
   // useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

