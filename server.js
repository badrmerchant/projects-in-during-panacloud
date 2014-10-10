
/**
 * Module dependencies.
 */

var express = require('express');

var http = require('http');
var path = require('path');
//var mongoStore = require('connect-mongo')(express);
//var passport = require('passport');
//var mongoose = require('mongoose');


var app = express();

//mongo uri
/**
app.set('mongodb-uri', process.env.MONGOLAB_URI || 'localhost/sampledb');

//setup mongoose
app.db = mongoose.createConnection(app.get('mongodb-uri'));
app.db.on('error', console.error.bind(console, 'mongoose connection error: '));
app.db.once('open', function () {
    console.log('mongoose open for business');
});

require('./models')(app, mongoose);
*/
// all environments
app.set('port', process.env.PORT || 9000);
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
//sir zia
app.use(function(req, res, next) {
    if(req.url.match(/^\/test\//) != null) {
        res.sendfile(path.join(__dirname, req.url));
    } else {
        next();
    }
});
/*
app.get('/test', function(req, res){
    //   sir zia
    // res.render('../../test/e2e/runner.html')
    // badar
    res.render('../test/e2e/runner.html') ;
    //             ../.    work ../test
})    */

//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
//app.engine('html', require('ejs').renderFile);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
//badar app.get('/', require('./views/main').index);
// sir zia app.get('/', routes.index);
require('./routes')(app, null);

var server =  http.createServer(app);
var io = require('socket.io').listen(server);

io.configure(function () {
    io.set('transports', ['xhr-polling']);
});

io.sockets.on('connection', function (socket) {
    //----->> - Socket Listeners - <<-----
    console.log("socket client connected");
    require("./realTimeServer").initialize( io, socket );
});



server.listen(process.env.PORT || app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
    //var addr = app.address();
    //console.log('Express server app listening on http://' + addr.address + ':' + addr.port);
});

