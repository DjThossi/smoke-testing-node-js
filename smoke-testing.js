var http = require('http');
var LineByLineReader = require('line-by-line');

var statusCode = 0;
var lineReader = new LineByLineReader('paths.txt');

lineReader.on('error', function (error) {
    console.log(error);
});

lineReader.on('line', function (path) {
    var options = {
        hostname: 'localhost',
        port: 4000,
        path: path,
        method: 'GET'
    };

    http.get(options, function (response) {
        if (response.statusCode != 200) {
            statusCode = 1;
            console.error(
                'http://' + options.hostname + ':' + options.port + response.req.path +
                ' - ' + response.statusCode
            );
        }

        var bodyChunks = [];
        response
            .on('data', function (chunk) {
                bodyChunks.push(chunk);
            })
            .on('end', function () {
                var body = Buffer.concat(bodyChunks);
                //TODO do stuff with body
                //console.log(response.req.path);
            });
    });
});

process.on('exit', function(err){
    process.exit(statusCode);
});