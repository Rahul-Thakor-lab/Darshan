// Database connection setup
const mongoose = require('mongoose');

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.DBURL);
        console.log("Connected to DB");
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectdb;