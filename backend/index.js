const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const connectdb=require("./config/db");
const app = express();

app.use(express.json());

connectdb();
function main(){
    app.listen(5000);
    console.log("listening on port 5000")
}
main();