System.register(["../../util/index.js"], function (_export, _context) {
  "use strict";

  var obrigatorio;
  return {
    setters: [function (_utilIndexJs) {
      obrigatorio = _utilIndexJs.obrigatorio;
    }],
    execute: function () {
      let Negociacao = class Negociacao {
        constructor(_data = obrigatorio("data"), _quantidade = obrigatorio("quantidade"), _valor = obrigatorio("valor")) {

          Object.assign(this, {
            _quantidade,
            _valor
          });
          this._data = new Date(_data.getTime());
          // congelando o objeto assim que for instanciado
          Object.freeze(this);
        }

        // método equals para comparação de dois objetos iguais
        equals(negociacao) {
          return JSON.stringify(this) == JSON.stringify(negociacao); // stringfy converte um objeto em string
        }

        // método que realiza o calculo do volume
        get volume() {
          return this._quantidade * this._valor;
        }
        // métodos get que retornar os valors
        get data() {
          return new Date(this._data.getTime());
        }
        get qtd() {
          return this._quantidade;
        }
        get valor() {
          return this._valor;
        }
      };

      _export("Negociacao", Negociacao);
    }
  };
});
//# sourceMappingURL=Negociacao.js.map