const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://digitalvidyasaarthidvs:digitalvidyasaarthidvs@cluster0.zjnwc.mongodb.net/DevTinder"
  );
};

module.exports = connectDB;