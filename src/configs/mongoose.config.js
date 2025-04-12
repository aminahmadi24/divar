const mongoose = require("mongoose");

mongoose.connect(
    process.env.MONGO_URI
).then(() => {
    console.log("Connected to database.");
}).catch((err) => {
    console.log(err?.message ?? "Failed to connect to database.");
})