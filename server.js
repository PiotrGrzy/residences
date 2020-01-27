const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const port = process.env.PORT || 5000;
const homes = require('./routes/homes');
const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();
dotenv.config();

const DB = process.env.DB_CLUSTER_ADRESS;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('DB connection succesfull!');
  });

app.use(bodyParser.json({ limit: '10mb' }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '10mb'
  })
);
app.use(cors());

app.use('/api/homes', homes);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.listen(port, () => console.log('Server runnnig on port: ' + port));
