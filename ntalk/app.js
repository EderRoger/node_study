var express = require('express');
var app = express();
var load = require('express-load');
//var error = require('./middleware/error');  // comentado pois estava sempre caindo na pagina 404
var cookieParser = require('cookie-parser')
var session = require('cookie-session')
var bodyParser = require('body-parser')
var methodOverride = require('method-override');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookieParser('ntalk'));
app.use(session({
  keys: ['usuario']
}));
app.use(bodyParser());
app.use(methodOverride('X-HTTP-Method-Override'));
//app.use(app.router); //deprecetad no more necessary
app.use(express.static(__dirname + '/public'));
//app.use(error.notFound); // comentado pois estava sempre caindo na pagina 404
//app.use(error.serverError); // comentado pois estava sempre caindo na pagina 404

//app.get('/', routes.index);
//app.get('/usuarios', routes.user.index);

load('models')
 .then('controllers')
 .then('routes')
 .into(app);


io.sockets.on('connection', function(client){
	client.on('send-server', function(data){
		var msg = "<b>" + data.nome + ":</b>" + data.msg + "<br>";
		client.emit('send-client', msg);
		client.broadcast.emit('send-client', msg); 
	});
});

app.listen(3000, function(){
    console.log("Ntalk no ar.");
});