var fs = require('fs');

var leituraAsync = function(arquivo){
  console.log('Fazendo leitura do arquivo');
  var inicio = new Date().getTime();
  fs.readFile(arquivo);
  var fim = new Date().getTime();
  console.log("Bloqueio Asyncrono" + (fim - inicio) + "ms");
}

module.exports = leituraAsync;
