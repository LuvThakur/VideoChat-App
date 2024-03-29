const app = require('./app');

const mongoose = require('mongoose');

// Load environment variables from .env file
require('dotenv').config();


// uncaught exception error handling
process.on("uncaughtException", (err) => {
    console.log(err);
    process.exit(1);

})


// setup db connection
// const db_url = process.env.DB_URI.replace("<password>", process.env.DB_PASS);
const mongoURI = "mongodb://127.0.0.1:27017/ChatApp";

const options = {

    // no longer needed
};


mongoose.connect(mongoURI, options).then(
    () => {
        console.log('Connected to MongoDB');
        startServer();
    }
).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);

})

function startServer() {


    // we need http server 
    const http = require('http');

    // server create 
    const server = http.createServer(app);


    // port 
    const port = process.env.PORT || 8000;

    server.listen(port, () => {
        console.log(`Server Running at port ${port}`);
    })

    // handle Rejection error
    process.on("unhandledRejection", (err) => {
        console.log(err);
        server.close(() => {
            process.exit(1);
        });
    })
}