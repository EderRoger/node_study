var http = require('http');
var fs = require('fs');

var funcServer = function(request, response){
  //Constante __dirname retorna o diretorio raiz de sua applicação
  fs.readFile(__dirname + "/index.html", function(err, html){
    response.writeHeader(200, {'Content-Type': 'text/html'});
    response.write(html);
    response.end();
  });
};

var server  = http.createServer(funcServer);

var funcaoLog = function(){
  console.log('Executando site pessoal');
};
server.listen(3000, funcaoLog);
