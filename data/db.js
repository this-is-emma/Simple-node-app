/* Mongoose Connection */
const mongoose = require('mongoose');
assert = require('assert');

const url = process.env.CONNECTION_URL;
mongoose.connect(
    url,
    {
      useNewUrlParser: true, useUnifiedTopology: true,
    },
    (err) => {
      assert.equal(null, err);
      console.log("Connected successfully to database");
    }
  );
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'));
mongoose.set('debug', true);

module.exports = mongoose.connection;
