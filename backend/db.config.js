const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.MONGODB_URL;
module.exports = () => {
  mongoose.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 5000,
    },
    (err) => {
      if (err) {
        console.log('error connecting to db' + err);
      } else {
        console.log('connect to db');
      }
    }
  );
};
