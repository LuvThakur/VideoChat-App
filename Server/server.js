const app = require('./app');


// we need http server 
const http = require('http');

// server create 
const server = http.createServer(app);



// port 
const port = process.env.PORT || 8000;

server.listen(port, () => {
    console.log(`Server Running at port ${port}`);
})



