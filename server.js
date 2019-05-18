const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db,{ useNewUrlParser: true })
    .then(() => console.log('Successfully Connected to MongoDB'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World'));

// Use Routes
app.use('/api/items', items);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
