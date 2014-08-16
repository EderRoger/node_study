var express = require('express');
var load = require('express-load');
var error = require('./middleware/error');
var cookieParser = require('cookie-parser')
var session = require('cookie-session')
var bodyParser = require('body-parser')
var methodOverride = require('method-override');


var app = express();

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
app.use(error.notFound);
app.use(error.serverError);

//app.get('/', routes.index);
//app.get('/usuarios', routes.user.index);

load('models')
 .then('controllers')
 .then('routes')
 .into(app);

app.listen(3000, function(){
    console.log("Ntalk no ar.");
});