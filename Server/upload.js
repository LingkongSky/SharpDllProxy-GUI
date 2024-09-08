const express = require('express')
const multer = require('multer')
const router = express.Router();
const server = require("./util");
const c = require('config');
const fs = require('fs').promises;
const upload = multer({ dest: server.input_path });
const output_path = server.output_path;
const exec_path = server.sharp_dll_proxy;
const { exec } = require('child_process');


// set the router
router.post('/', upload.array('files', 2) ,(req, res) => {
    console.log(req.files);

    if (!req.files) {
        return res.status(400).send('No file uploaded');
    }

    const count = req.files.length;
    //const { originalname, size } = req.files[0];
    
    for(var i=0;i<count;i++){
        if (req.files[i].size > 1024*1024*100) {
            deleteFile(req.files);
            return res.status(400).send('File size too big');
        }
    }

    var command;
    if(count < 2){
        command = exec_path + " --dll " + req.files[0].path + " --name " + req.files[0].originalname + " --payload " + "none" + " --out " + output_path;
    }else{
        command = exec_path + " --dll " + req.files[0].path + " --name " + req.files[0].originalname + " --payload " + req.files[1].path + " --out " + output_path;
    }


    // 调用shell
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(400).send('Uncaught error occured:' + error);
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });



/*
    // create new folder by timestamp
    const timestamp = Date.now();
    const folderPath = `uploads/${timestamp}`;
    fs.mkdirSync(folderPath);



    // move the tmp file and exec the shell
    fs.rename(req.file.path, `${folderPath}/${req.file.filename}`, (err) => {
        if (err) throw err;
        console.log('File moved successfully');

        // Execute shell command
        exec('your_shell_command_here', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });

        res.status(200).send('File uploaded and processed successfully');
    });

*/

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
