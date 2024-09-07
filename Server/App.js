var helmet = require('helmet');
const express = require("express");
var app = express();

app.use('/',express.static("../Front/dist"));


app.listen(4156, () => {
    console.log("Server start in port:4156 !");
});


app.use(helmet());