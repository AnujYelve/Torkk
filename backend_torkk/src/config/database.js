const mongoose = require("mongoose");

async function connectToDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Connected to MongoDB");
    console.log("Database:", conn.connection.name);
    console.log("Host:", conn.connection.host);

  } catch (error) {
    console.log(error);
  }
}

module.exports = connectToDB;