//Entry point of the application
require('dotenv').config();
const app = require('./app');
const connectdb = require('./config/db');

connectdb();

app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });