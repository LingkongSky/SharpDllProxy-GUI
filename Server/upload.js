const express = require('express')
const multer = require('multer')
const router = express.Router();
const server = require("./util");

const upload = multer({ dest: server.input_path });



// set the router
router.post('/', upload.array('files', 2) ,(req, res) => {
    console.log(req.files);

    if (!req.files) {
        return res.status(400).send('No file uploaded');
    }


    // check the file
    const { originalname, size } = req.file;
    if (originalname && size) {
        // Perform validation logic here
    }


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



});



module.exports = router;
