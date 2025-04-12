const express = require("express");

const main = async () => {
    const app = express();
    require("dotenv").config();
    require("./src/configs/mongoose.config");
    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`Server is running on port ${port}.`);
    })
}
main();