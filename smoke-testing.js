var http = require('http');

var paths = [
    '/de/', //working
    '/en/', //working
    '/foo-bar' //not working
];

paths.forEach(function (path) {
    var options = {
        hostname: 'localhost',
        port: 4000,
        path: path,
        method: 'GET'
    };

    http.get(options, function(response){
        console.log(response.req.path + ' - ' + response.statusCode);

        var bodyChunks = [];
        response
        .on('data', function(chunk) {
            bodyChunks.push(chunk);
        })
        .on('end', function() {
            var body = Buffer.concat(bodyChunks);
            //TODO do stuff with body
            //console.log(response.req.path);
        });
    });
});