// Using database credentials from ThatSinclair's SQL environment
// CURRENTLY WORK IN PROGRESS, PLEASE DO NOT CHANGE ANYTHING

const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "19b5741T65532", // DATABASE PASSWORD, ASK DATABASE DEV FOR THIS (which is me, hehee)
  database: "pcshop_db",
});

db.connect((err) => {
  if (err) {
    console.error("////////// ❌ Database connection failed:", err, "//////////");
  } else {
    console.log("//////////  ✅ Connected to MySQL database! ////////// ");
  }
});

module.exports = db;
