module.exports = function(app){
	var home = app.controllers.home;
	app.get('/', home.index);
	app.post('/entrar', home.login);
	app.get('/sair', home.logout);
}

/*var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
*/

