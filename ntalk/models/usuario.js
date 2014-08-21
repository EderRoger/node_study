module.exports = function(app){
    var db = require('../libs/db_connect')();
	var Schema = require('mongoose').Schema;

	var contato = Schema({
		nome: String
 	  , email: String
	});

	var usuario = Schema({
		nome:{type: String, require: true},
		email:{type: String, require: true, index: {unique: true}},
		contatos: [contato]
	});

	return db.model('usuarios', usuario);
}