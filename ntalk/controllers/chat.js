module.exports = function(app){
	var ChatController = {
		index: function(req, res){
			var resultado = {email: req.params.email, usuario: req.session.usuario};
			render('chat/index', resultado);
		}
	};
	return ChatController;
};