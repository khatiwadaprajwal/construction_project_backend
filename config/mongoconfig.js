const mongoose = require("mongoose");
const dbUrl = "mongodb+srv://prajwalkhatiwada28:Prajwal%4012345@construction.9uzzdh0.mongodb.net/";

mongoose.connect(dbUrl, {
    autoIndex: true,
    autoCreate: true
});

const db = mongoose.connection;

db.on("error", (error) => {
    console.error("Error connecting database:", error.message);
});

db.once("open", () => {
    console.log("Database Connected Successfully!");
});
