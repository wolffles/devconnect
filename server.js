const express = require('express');
const mongoose = require('mongoose');

const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");


const app = express();

//bodyparser middleware
//express now has a json parser in it.
app.use(express.json());

//DB config
const db = require('./config/keys').mongouURI

//Connect to MongoDB
mongoose.connect(db, {useNewUrlParser:true})
    .then(()=> console.log('mongodb connected'))
    .catch(err => console.log(err));

//Use Routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);

app.get('/', (req, res) => res.send('Hello'));


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

