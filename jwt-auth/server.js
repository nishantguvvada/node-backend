const express = require('express');
const jwt = require('jsonwebtoken');
const jwtSecret = "123456";

const ALL_USERS = [
    {
        username: "harkirat",
        password: "123",
        name: "Harkirat Singh"
    },
    {
        username: "raman",
        password: "456",
        name: "Raman Singh"
    },
    {
        username: "priya",
        password: "123123",
        name: "Priya Singh"
    },
]

const userExists = (username, password) => {
    const exists = ALL_USERS.find(user => user.username === username && user.password === password);
    if(exists) {
        return true;
    } else {
        return false;
    }
} 

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    return res.json({message: "working"})
});

app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(!userExists(username, password)) {
        return res.json({message: "Invalid username or password"});
    }

    const token = jwt.sign({ username: username }, jwtSecret);
    return res.json({message: "logged in!", token: token});
});

function authenticationMiddleware(req, res, next) {
    const header = req.headers.authorization;

    const token = header.split(' ')[1];

    try {
        const decoded = jwt.verify(token, jwtSecret);
        const username = decoded.username;
        req.username = username;
        next()
    } catch(err) {
        return res.json({message: "Invalid token"});
    }
}

app.get('/users', authenticationMiddleware, (req, res) => {
    return res.json({message: `You are ${req.username}`, all_users: ALL_USERS});
});

app.listen(3000);