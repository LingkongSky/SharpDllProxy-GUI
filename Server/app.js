const express = require("express");
const helmet = require('helmet');
const app = express();
const upload = require("./upload");
const download = require("./download");
const server = require("./util");
const fs = require('fs').promises;
const path = require('path');

const input_path = server.input_path;
const output_path = server.output_path;
const version = "1.0.0";

try{
    // Start the server
    app.use(helmet());
    app.use('/', express.static(path.resolve(__dirname, '..')  + "/Front/dist"));
    app.use("/upload", upload);
    app.use("/download", download);


    setInterval(async () => {
        await deleteTmpFiles(input_path);
        await deleteTmpFiles(output_path);        
    }, 60000);


    app.listen(server.port, server.host, () => {
        console.log("Welcome to use the \x1B[32mSharpDllProxy-GUI " + version + "\x1B[0m");
        console.log("It provide by \x1B[32mhttps://github.com/LingkongSky/SharpDllProxy-GUI\x1B[0m");
        console.log("Server start in \x1B[32mhttp://" + server.host + ":" + server.port + "\x1B[0m");
    });
    }catch(e){
    console.log(e);
    process.exit(1);
}


async function deleteTmpFiles(folderPath) {
    try {
        const files = await fs.readdir(folderPath);

        const currentTime = Date.now();
        const twentyFourHoursAgo = currentTime - 24 * 60 * 60 * 1000; // delete the files that create time over 24h

        for (const file of files) {
            const filePath = path.join(folderPath, file);
            const stats = await fs.stat(filePath);
            if (stats.isFile() && stats.mtime.getTime() < twentyFourHoursAgo) {
                await fs.unlink(filePath);
            } else if (stats.isDirectory()) {
                await deleteTmpFiles(filePath);
                const subFiles = await fs.readdir(filePath);
                if (subFiles.length === 0) {
                    await fs.rmdir(filePath);
                }
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
