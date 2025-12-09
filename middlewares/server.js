const express = require('express');

const app = express();

request_count = 0

function countRequestMiddleware(req, res, next) {
    request_count += 1;
    req.count = request_count;
    next()
}

function averageRequestTimeMiddleware(req, res, next) {
    const start = new Date().getTime();
    req.startTime = start;
    next();
}

// app.use allows to implement middleware to every route
app.use(express.json());

// Express lets you chain through middlewares
app.get('/users', (req, res, next) => {
    console.log("middlewares");
    next();
}, (req, res) => {
    console.log("final logic");
    return res.json({"message":"Chaining middlewares in express endpoint"})
});

app.get('/', countRequestMiddleware, (req, res) => {
    return res.json({"message": `Request Count: ${req.count}`})
});

app.get('/time', averageRequestTimeMiddleware, (req, res) => {

    let a = 0;
    for(let i = 0; i<100000000; i++) {
        a++;
    }

    const end = new Date().getTime();
    const requestTime = end - req.startTime;
    return res.json({"Request Time": `${requestTime}`});
});

// global catch - Error Handling Middleware - has 4 arguments err, req, res, next
app.use(function(err, req, res, next) {
    res.json({
        message: "error with server"
    })
})

app.listen(3000);