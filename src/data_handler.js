module.exports = function(data, sock) {
    console.log(data.toString());
    var ds = data.toString().trim();
    var r = /^\$cmd:/
        // sock.write(data);
    if (ds == 'close') {
        console.log('closeing...');
        sock.destroy();
    } else if (r.test(ds)) {
        var cmd = ds.substr(5);
        if (cmd) {
            $('lcd').clear();
            $('lcd').print(cmd);
        }
    } else {
        $('lcd').clear();
        $('lcd').print('unknown!');
    };

};
