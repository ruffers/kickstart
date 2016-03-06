// server - build upon net
var net = require('net');

var config = require('./config');

var server = net.createServer();

var data_handler = require('./data_handler');

server.on('connection', function (clientSock) {

    console.log('CONNECTED: ' + clientSock.remoteAddress + ':' + clientSock.remotePort);

    clientSock.on('data', function (data) {
        // console.log(data);
        data_handler(data, clientSock);
    });

    clientSock.on('close', function (data) {
        console.log('CLOSED: ' + clientSock.remoteAddress + ' ' + clientSock.remotePort);
    });

});

server.on('close', function (data) {
    console.log('server closed', data);

});

server.on('listening', function () {
    console.log('listening on', server.address());

});

// server.on('error', function (e) {
// if (e.code == 'EADDRINUSE') {
//   console.log('Address in use, retrying...');
//   setTimeout(function () {
//     server.close();
//     server.listen(PORT, HOST);
//   }, 1000);
// }
// });

module.exports = server;
