const fs = require('fs');
const path = require('path');
process.env["NODE_CONFIG_DIR"] = path.resolve(__dirname, '..');
const config = require('config');


var host, port, input_path, output_path, sharp_dll_proxy, max_file_size;

function Server(host, port, input_path, output_path, sharp_dll_proxy, max_file_size) {
    this.host = host;
    this.port = port;
    this.input_path = input_path;
    this.output_path = output_path;
    this.sharp_dll_proxy = sharp_dll_proxy;
    this.max_file_size = max_file_size;
}

// read the config
if (config.has('host') && config.get('host') &&
    config.has('input_path') && config.get('input_path') &&
    config.has('output_path') && config.get('output_path') &&
    config.has('sharp_dll_proxy') && config.get('sharp_dll_proxy') &&
    config.has('max_file_size') && config.get('max_file_size')
) {

    host = config.get('host');
    port = config.get('port');
    input_path = config.get('input_path');
    output_path = config.get('output_path');
    sharp_dll_proxy = config.get('sharp_dll_proxy');
    max_file_size = config.get('max_file_size');


    if (!path.isAbsolute(input_path)){
        input_path = path.resolve(__dirname, input_path);
    }   

    if (!path.isAbsolute(output_path)) {
        output_path = path.resolve(__dirname, output_path);
    }  


    if (!path.isAbsolute(sharp_dll_proxy)) {
        sharp_dll_proxy = path.resolve(__dirname, sharp_dll_proxy);
    }  


    createFolder(input_path);
    createFolder(output_path);

    var server = new Server(host, port, input_path, output_path, sharp_dll_proxy, max_file_size);
    module.exports = server;

} else {
    console.log("config context error.");
    process.exit(1);
}


// create the folder if the folder not exist
function createFolder(folderPath) {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath,{recursive: true});
    }
}