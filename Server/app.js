const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const mongosanitize = require('express-mongo-sanitize');

// const xss = require('xss-clean');



const app = express();



app.use(mongosanitize())

// it gives an error
// app.use(xss())


// app.use() is used to mount middleware functions.


// express.json() is a built-in middleware function , it parses incoming requests with JSON payloads.
//  limit the size of the JSON payload  by limit option


app.use(express.json({ limit: "10kb" }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())

if (process.env.NODE_ENV === "development") {

    app.use(morgan("dev"))

}

const limiter = rateLimiter({
    max: 3000,
    windowMS: 60 * 60 * 1000,
    message: "Too many requests from this IP , Please try again in an hour"
});


app.use("/tawk", limiter)

app.use(express.urlencoded({
    extended: true
}));

app.use(cors(
    {
        origin: "*",
        methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
        credentials: true,
    }
))






module.exports = app;