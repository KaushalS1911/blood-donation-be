const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = 9000;
const cardRouter = require("./card-route");
const cors = require('cors');

const connectionDB = async (database) => {
    await mongoose
        .connect(database)
        .then(() =>
            console.log(`Successfully connected to : ${mongoose.connection.host}`)
        )
        .catch((err) => console.log(`Err : ${err}`));
};

connectionDB(process.env.DB_CONNECTION_STRING);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get("/", (req, res) => {
    res.send("Hello From Server this is blood donation");
});

app.use("/api/card", cardRouter);

app.listen(PORT, () => {
    console.log(`Your Server is running at PORT ${PORT}`);
});
