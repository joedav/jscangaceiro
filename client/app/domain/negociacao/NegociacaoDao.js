System.register(['./Negociacao.js'], function (_export, _context) {
  "use strict";

  var Negociacao;
  return {
    setters: [function (_NegociacaoJs) {
      Negociacao = _NegociacaoJs.Negociacao;
    }],
    execute: function () {
      let NegociacaoDao = class NegociacaoDao {

        // construtor recebendo a conexão como param
        constructor(connection) {

          this._connection = connection;

          this._store = 'negociacoes'; // as negociacoes estão no store 'negociacoes'
        }

        // métodos lista todos, ele busca todas as negociacoes na store
        listaTodos() {
          return new Promise((resolve, reject) => {

            // array com que armazenara as negociacoes
            const negociacoes = [];

            // cursor
            const cursor = this._connection.transaction([this._store], "readwrite").objectStore(this._store).openCursor();

            cursor.onsuccess = e => {

              // target atual do cursor
              const atual = e.target.result;

              // verifica se o cursor não é nulo
              if (atual) {
                const negociacao = new Negociacao(atual.value._data, atual.value._quantidade, atual.value._valor);

                // adiciona a negociacao atual no array
                negociacoes.push(negociacao);

                // pula para o prox. target caso tenha
                atual.continue();
              } else {

                // resolve a promise com as negociacoes
                resolve(negociacoes);
              }
            };

            // caso o cursor de erro
            cursor.onerror = e => {

              // mensagem no console
              console.log(e.target.error);

              // reject
              reject("Não foi possível listar as negociações");
            };
          });
        }

        // método adiciona: adicionará uma nova negociacao na lista de negociacoes
        adiciona(negociacao) {

          return new Promise((resolve, reject) => {

            // variavel com a request
            const request = this._connection.transaction([this._store], 'readwrite').objectStore([this._store]).add(negociacao);

            // request success
            request.onsuccess = e => resolve();

            // request error
            request.onerror = e => {

              // mensagem de erro no console
              console.log(e.target.error);

              reject("Não foi possível salvar a negociação!");
            };
          });
        }

        // método que remove todas as negociacoes 
        apagaTodos() {
          return new Promise((resolve, reject) => {
            const request = this._connection.transaction([this._store], "readwrite").objectStore(this._store).clear();

            // caso a request de certo
            request.onsuccess = e => resolve();
            // caso a request de erro
            request.onerror = e => {
              console.log(e.target.error);
              reject("Não foi possível remover as negociações!");
            };
          });
        }
      };

      _export('NegociacaoDao', NegociacaoDao);
    }
  };
});
//# sourceMappingURL=NegociacaoDao.js.map