const express = require('express')
const router = express.Router();
const server = require("./util");
const fs = require('fs');
const path = require('path');
const output_path = server.output_path;

// set the router
router.get('/', (req, res) => {

    // check the params
    if (!("mode" in req.query && "url" in req.query)){
        return res.status(400).send("Invalid parameters");
    }

    var mode = req.query.mode;
    var url = req.query.url;

    // check the path
    if (!fs.existsSync(output_path + "/" + url)) {
        return res.status(403).send("Invalid url");
    }


    // get the target file
    var folderPath = output_path + "/" + url;
    var filePath,fileStream;

    if (mode == "0"){
        filePath = getFirstFileInFolder(folderPath, ".c");
        fileStream = fs.createReadStream(filePath);
    }else if (mode == "1"){
        filePath = getFirstFileInFolder(folderPath, ".dll");
        fileStream = fs.createReadStream(filePath);
    }else{
        return res.status(400).send("Invalid parameters");
    }
    
    fileStream.on('error', function (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    });


    if (!filePath) {
        return res.status(404).send("File not found");
    }

    res.header("Access-Control-Allow-Origin", "*");
    const head = {
        'Content-Type': 'application/octet-stream; charset=UTF-8',
        'Content-Disposition': 'attachment;filename="' + path.basename(filePath) + '"',
        'Content-Length': fs.statSync(filePath).size
    };
    res.writeHead(200, head);

    fileStream.pipe(res);
});




function getFirstFileInFolder(folderPath, fileExtension) {
    const files = fs.readdirSync(folderPath);
    for (var file of files) {
        const filePath = path.join(folderPath, file);
        const fileStat = fs.lstatSync(filePath);
        if (!fileStat.isDirectory() && file.endsWith(fileExtension)) {
            return filePath;
        }
    }
    return null; 
}

module.exports = router;
