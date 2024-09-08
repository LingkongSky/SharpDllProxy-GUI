const express = require('express')
const multer = require('multer')
const router = express.Router();
const server = require("./util");
const fs = require('fs');
const upload = multer({ dest: server.input_path });
const output_path = server.output_path;
const exec_path = server.sharp_dll_proxy;
const max_file_size = server.max_file_size;
const { exec } = require('child_process');


// set the router
router.post('/', upload.array('files', 2) ,(req, res) => {

    if (!req.files) {
        return res.status(400).send('No file uploaded');
    }

    const count = req.files.length;
    //const { originalname, size } = req.files[0];
    
    for(var i=0;i<count;i++){
        if (req.files[i].size > max_file_size) {
            deleteFile(req.files);
            return res.status(400).send('File size too big');
        }
    }

    const tempPath = req.files[0].filename;
    const folderPath = `${output_path}/${tempPath}`;

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }
    
    var command;
    if(count < 2){
        command = exec_path + " --dll " + req.files[0].path + " --name " + req.files[0].originalname + " --payload " + "none" + " --output " + folderPath;
    }else{
        command = exec_path + " --dll " + req.files[0].path + " --name " + req.files[0].originalname + " --payload " + req.files[1].path + " --output " + folderPath;
    }


    // exec the command 
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(400).send('Uncaught error occured:' + error);
        }else{
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);

            return res.status(200).json({ "url": tempPath });
        }

    });


});


//delete the tmp file
async function deleteFile(files) {
    for (var i = 0; i < files.length; i++) {
        try {
            await fs.unlink(files[i].path);
        } catch (err) {
            console.error('delete file error:', err);
        }
    }
}



module.exports = router;
