const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const connectdb=require("./config/db");
const app = express();

app.use(express.json());

const {resourceRouter}=require("./routes/resource")
app.use("/api/resources",resourceRouter)

connectdb();
function main(){
    app.listen(5000);
    console.log("listening on port 5000")
}
main();