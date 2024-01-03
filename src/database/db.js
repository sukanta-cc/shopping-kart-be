const mongoose = require("mongoose");
const config = require("../config");

function connectToDb() {
  mongoose
    .connect(config.mongodbUri)
    .then(() => {
      console.log(`    -------------------------------------
    🚀 Database connected successfully 🚀
    -------------------------------------
        `);
    })
    .catch((err) => {
      console.error(err, "<<-- Error in database connection");
    });
}

module.exports = connectToDb;
