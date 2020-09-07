import davlib from './davclient.umd'
function getDateTimeStr() {
    var date = new Date();
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    var dateTimeStr = Y + M + D + h + m + s;
    return dateTimeStr;
}
class WebDavConnector {
    constructor(hostname, port, protocol, username, password) {
        var connector = new davlib.DavClient();
        connector.initialize(hostname, port, protocol, username, password);
        return connector;
    }
}
function uploadFiles(connector, filename, fileData) {
    //file name eg:YYYYDDMMhhmmss_filename
    var filenameNew = getDateTimeStr() + '_' + filename;
    var reader = new FileReader();
    reader.addEventListener("load", function () {
        var arrayBuffer = reader.result;
        console.log('file readed:' + filename + ' -> ' + filenameNew);
        connector.PUT(config.uploadPath + filenameNew, arrayBuffer, function (statusCode) {
            console.log('file uploaded:' + filenameNew + ' | status code: ' + statusCode);
            var url = config.accessUrl + filenameNew;
            // alert('url: ' + url)
            callback((statusCode == 201) ? null : new Error('upload error status code:' + statusCode), filenameNew, url);
        });
    }, false);
    if (fileData) {
        reader.readAsArrayBuffer(fileData);
    }
}
var connector = new WebDavConnector(config.hostname, config.port, config.protocol, config.username, config.password);
uploadFiles(connector, filename, fileData);
