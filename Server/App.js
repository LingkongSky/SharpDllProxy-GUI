const express = require("express");
const helmet = require('helmet');
const app = express();
const upload = require("./upload");
const download = require("./download");
const server = require("./util");


try{
    // Start the  server
    app.use(helmet());
    app.use('/', express.static("../Front/dist"));
    app.use("/upload", upload);
    app.use("/download", download);

    app.listen(server.port, server.host, () => {
        console.log("Server start in " + server.host + ":" + server.port);
    });

    }catch(e){
    console.log(e);
    process.exit(1);
}


