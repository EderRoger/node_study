var app = require('../../app')
    , request = require('supertest')(app);

describe('No controller contatos', function() {
  describe('o usuario nao logado', function() {
	
  	it('deve ir para rota / ao fazer GET /contatos', function(done){
      request.get('/contatos')
             .end(function(err, res) {
        res.headers.location.should.eql('/');
        done();
      });
    });

    it('deve ir para rota / ao fazer GET /contato/1', function(done){
      request.get('/contato/1')
             .end(function(err, res) {
        res.headers.location.should.eql('/');
        done();
      });
    });

    it('deve ir para rota / ao fazer GET /contato/1/editar', function(done){
      request.get('/contato/1/editar')
             .end(function(err, res) {
        res.headers.location.should.eql('/');
        done();
      });
    });

    it('deve ir para rota / ao fazer POST /contato', function(done){
      request.post('/contato')
             .end(function(err, res) {
        res.headers.location.should.eql('/');
        done();
      });
    });

    it('deve ir para rota / ao fazer DELETE /contato/1', function(done){
      request.del('/contato/1')
             .end(function(err, res) {
        res.headers.location.should.eql('/');
        done();
      });
    });

    it('deve ir para rota / ao fazer PUT /contato/1', function(done){
      request.put('/contato/1')
             .end(function(err, res) {
        res.headers.location.should.eql('/');
        done();
      });
    });
  });
  describe('o usuario logado', function() {
   // testes aqui...
  });
});