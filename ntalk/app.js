//const KEY  = 'ntalk.sid', SECRET = 'ntalk';
var express = require('express')
, cfg = require('./config.json')
, load = require('express-load')
, bodyParser = require('body-parser')
, cookieParser = require('cookie-parser')
, expressSession = require('express-session')
, methodOverride = require('method-override')
, compression = require('compression')
, csurf = require('csurf')
, error = require('./middlewares/error')
, redisAdapter = require('socket.io-redis')
, RedisStore = require('connect-redis')(expressSession)
, app = express()
, server = require('http').Server(app)
, io = require('socket.io')(server)
, cookie = cookieParser(cfg.SECRET)
, store = new RedisStore({prefix: cfg.KEY})
; 

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(compression());
app.use(cookie);
app.use(expressSession({
 secret: cfg.SECRET,
 name: cfg.KEY,
 resave: true,
 saveUninitialized: true,
 store: store
}));
//app.use(cookieParser('ntalk'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.disable('x-powered-by');
app.use(express.static(__dirname + '/public', cfg.CACHE));
app.use(csurf());
app.use(function(req, res, next) {
  res.locals._csrf = req.csrfToken();
  next();
});

io.adapter(redisAdapter(cfg.REDIS));

io.use(function(socket, next) {
  var data = socket.request;
  cookie(data, {}, function(err) {
    var sessionID = data.signedCookies[cfg.KEY];
    store.get(sessionID, function(err, session) {
      if (err || !session) {
        return next(new Error('acesso negado'));
      } else {
        socket.handshake.session = session;
        return next();
      }
    });
  });
});

load('models')
.then('controllers')
.then('routes')
.into(app);

load('sockets')
.into(io);

// middleware de tratamento erros
app.use(error.notFound);
app.use(error.serverError);

server.listen(3000, function(){
   console.log("Ntalk no ar.");
});

module.exports = app;