const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const userRouter = require("./routes/user.route");

const { pageNotFound, serverNotFound } = require("./middlewares/handleErrors");

//Reads all content from the file .env and puts its values into process.env
require('dotenv').config();

// Database connection
require('./config/db');

const app = express();

// middleware
app.use(express.json());// req.body for json data
app.use(express.urlencoded({ extended: true }));// req.body for form-data (with files)

app.use(morgan("dev")); // Print the information of each request
// app.use(cors({origin:'http:// localhost:4200'})); // Allow access only for a certain address
app.use(cors());// Allow access to all addresses

app.get('/', (req, res) => {
    res.send("wellcome");
});

app.use("/users", userRouter);

// If it got here - routing does not exist
app.use(pageNotFound);
app.use(serverNotFound);

const port = process.env.PORT;
app.listen(port, () => {
    console.log("running at http://localhost:" + port);
});