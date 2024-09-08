const config = require('config');

var host, port, input_path, output_path, sharp_dll_proxy;

function Server(host, port, input_path, output_path, sharp_dll_proxy) {
    this.host = host;
    this.port = port;
    this.input_path = input_path;
    this.output_path = output_path;
    this.sharp_dll_proxy = sharp_dll_proxy;
}

// read the config
if (config.has('host') && config.get('host') &&
    config.has('input_path') && config.get('output_path')) {

    host = config.get('host');
    port = config.get('port');
    input_path = config.get('input_path');
    output_path = config.get('output_path');
    sharp_dll_proxy = config.get('sharp_dll_proxy');
    createFolder(input_path);
    createFolder(output_path);

    var server = new Server(host, port, input_path, output_path, sharp_dll_proxy);
    module.exports = server;

} else {
    console.log("config context error.");
    process.exit(1);
}


// create the folder if the folder not exist
function createFolder(folderpath) {
    var dir_path = '';
    try {
        const pathArr = folderpath.split('/');
        for (let i = 0; i < pathArr.length; i++) {
            if (pathArr[i]) {
                dir_path += `${pathArr[i]}/`;
                if (!fs.existsSync(dir_path)) {
                    fs.mkdirSync(dir_path);
                }
            }
        }
    } catch (e) { }
}
