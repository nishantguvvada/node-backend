const express = require('express');
const z = require('zod');

const app = express();
app.use(express.json());

const UserSchema = z.object({
    username: z.string(),
    email: z.email(),
    password: z.string()
})

function inputValidation(req, res, next) {
    const validation = UserSchema.safeParse(req.body)
    if(!validation.success) {
        return res.json({message:"input validation failed"})
    } else {
        next();
    }
}

app.get('/', (req, res) => {
    return res.json({message: "input validation"});
});

app.post('/user', inputValidation, (req, res) => {
    return res.json({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
});

app.listen(3000);