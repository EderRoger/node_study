var http = require('http');
var url = require('url');
var fs = require('fs');


//retorna o endereço local do arquivo no projeto
var diretorio = function(arquivo){
   return __dirname + "/" + arquivo;
};

var rotear = function(pathname){
   if(pathname && pathname != "/"){
     var arquivo = diretorio(pathname + ".html");
     var existe = fs.existsSync(arquivo);
     if(existe){
       return arquivo;
     }
     return diretorio("erro.html");
   }
   return diretorio("artigos.html");
};

var server = http.createServer(function(request, response){

  var pathname = url.parse(request.url).pathname;

  var pagina = rotear(pathname);

  fs.readFile(pagina, function(err, html){
    response.writeHeader(200, {'Content-Type': 'text/html'});
    response.end(html);
  });
});
server.listen(3000, function(){
  console.log('Executando desafio');
});
