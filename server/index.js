const config = require('config');
// not for prod. helps to allow 3000 and 4200
const cors = require('cors');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

// express, httt and socket will listen now together
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


if (!config.get('jwtPrivateKey')) {
    console.log('FATAL Error: jwtPrivateKey is not defined!');
    process.exit(1);
}

// routing for everything connected to "users" from other file
const users = require('./routes/users');
const auth = require('./routes/auth');
const posts = require('./routes/posts');

mongoose.connect('mongodb://localhost/eshop')
    .then(() => console.log("connected to mongoDB"))
    .catch(err => console.log(err));

// middleware, 3000/4200, not for prod
app.use(cors());
// body parser, transforms json to object
app.use(express.json());
// add io to object req, so we can use it in router/posts.js
app.use((req, res, next) => {
    req.io = io;
    next();
})

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/posts', posts);

io.on('connection', () => {
    console.log('a user is connected');
});

const port = 3000;
http.listen(port, () => console.log(`Server runs on port ${port}`));