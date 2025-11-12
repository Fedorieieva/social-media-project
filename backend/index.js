const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
require('dotenv').config();

const globalConfigs = require('./routes/globalConfigs');
const users = require('./routes/user');
const posts = require('./routes/post');
const comments = require('./routes/comments');
const awards = require('./routes/awards');
const cloudinary = require("./routes/cloudinary");

const app = express();

let corsOptions;

if (process.env.NODE_ENV === "production") {
    corsOptions = {
        origin: "https://social-media-project-f.vercel.app",
        methods: "GET,POST,PUT,DELETE,PATCH",
        credentials: true,
    };
} else {
    corsOptions = {
        origin: 'http://localhost:5173',
        methods: "GET,POST,PUT,DELETE,PATCH",
        credentials: true,
    };
}

app.use(cors(corsOptions));


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/api/configs', globalConfigs);
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/comments', comments);
app.use('/api/awards', awards);
app.use('/api/cloudinary', cloudinary);

app.use('/', (req, res) => {
    res.send('server is running');
});

// Сервер статичних ресурсів у production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));
