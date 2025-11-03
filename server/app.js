const path = require('path');
const express = require('express');
const app=express();
const cors = require('cors');
const bodyParser=require("body-parser");
const toursRouter = require('./routes/toursRoutes');
const authRouter=require("./routes/authRoutes");
const userRouter=require("./routes/userRoutes");
const bookingRouter=require("./routes/bookingRoutes");
const settingsRouter=require("./routes/settingsRoutes");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/tours', toursRouter);
app.use('/email',authRouter);
app.use("/user", userRouter);
app.use("/booking", bookingRouter);
app.use("/settings", settingsRouter);

module.exports = app;