const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const mongosanitize = require('express-mongo-sanitize');


const Routes = require("./Routes/Index");

// const xss = require('xss-clean');



const app = express();


// middlewares 
app.use(mongosanitize())

// it gives an error
// app.use(xss())


// app.use() is used to mount middleware functions.


// express.json() is a built-in middleware function , it parses incoming requests with JSON payloads.
//  limit the size of the JSON payload  by limit option


app.use(express.json({ limit: "10kb" }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
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
app.use(helmet())

// Development logging
if (process.env.NODE_ENV === "development") {

    app.use(morgan("dev"))

}
// Rate limiter
const limiter = rateLimiter({
    max: 3000,
    windowMS: 60 * 60 * 1000,
    message: "Too many requests from this IP , Please try again in an hour"
});


app.use("/tawk", limiter)

// Routes
app.use(Routes);

module.exports = app;