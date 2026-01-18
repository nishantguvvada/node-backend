const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('');

const User = mongoose.model('User', {
    username: { type: String, required: true },
    password: { type: String, required: true }
});

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).json({ "message": "working" })
});

app.post('/signup', async (req, res) => {

    try {

        const user = await User.create({
            username: req.body.username,
            password: req.body.password
        });

        return res.status(200).json({ "message": `User created with ID: ${user._id}`});

    } catch(err) {

        return res.status(400).json({ "error": err });

    }
});

app.listen(3000);