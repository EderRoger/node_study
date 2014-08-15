module.exports = function(app){
	var home = app.controllers.home;
	app.get('/', home.index);
}

/*var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
*/

