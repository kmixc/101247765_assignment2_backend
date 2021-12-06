const express = require("express")
const mongoose = require("mongoose")
const employeeRoutes = require('./routes/EmployeeRoutes.js')

const DB_URL = "mongodb+srv://kmixc:Reloop2001@cluster0.ijglg.mongodb.net/101247765_assignment2?retryWrites=true&w=majority"

const app = express()

const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use('/', employeeRoutes)

mongoose.Promise = global.Promise;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


app.get('/', (req, res) => {
    res.send("<h1>Welcome to assignment 2 backend</h1>");
});

app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});