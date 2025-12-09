const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.json({"message": "working"})    
});

// Using Route Parameters - embedded directly into the URL path
app.get('/user/:id', (req, res) => {
    const n = req.params.id;
    return res.json({"message": `You send ${n}`})
});

// Using Query String Parameters - key-value paris appended to the URL after ? separated by &
app.get('/user', (req, res) => {
    const n = req.query.n;
    return res.json({"message": `You send ${n}`})
});

app.listen(4000);