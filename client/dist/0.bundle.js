webpackJsonp([0],{

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NegociacaoService", function() { return NegociacaoService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_HttpService_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Negociacao_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_ApplicationException_js__ = __webpack_require__(4);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// importações




let NegociacaoService = class NegociacaoService {
  constructor() {
    // propriedade
    this._http = new __WEBPACK_IMPORTED_MODULE_0__util_HttpService_js__["a" /* HttpService */]();
  }

  obtemNegociacoesDoPeriodo() {
    var _this = this;

    return _asyncToGenerator(function* () {
      // ACESSA AOS PRÓPRIOS MÉTODOS ATRAVÉS DE THIS
      try {
        let periodo = yield Promise.all([_this.obtemNegociacoesDaSemana(), _this.obtemNegociacoesDaSemanaAnterior(), _this.obtemNegociacoesDaSemanaRetrasada()]);
        return periodo.reduce(function (novoArray, item) {
          return novoArray.concat(item);
        }, []).sort(function (a, b) {
          return b.data.getTime() - a.data.getTime();
        });
      } catch (err) {
        console.log(err);
        throw new __WEBPACK_IMPORTED_MODULE_2__util_ApplicationException_js__["a" /* ApplicationException */]('Não foi possível obter as negociações do período');
      }
    })();
  }

  // metodo que obtem as negociacoes da semana retrasada
  obtemNegociacoesDaSemanaRetrasada() {

    return this._http.get(`${"http://localhost:3000"}/negociacoes/retrasada`).then(dados => dados.map(objeto => new __WEBPACK_IMPORTED_MODULE_1__Negociacao_js__["a" /* Negociacao */](new Date(objeto.data), objeto.quantidade, objeto.valor)), err => {
      throw new __WEBPACK_IMPORTED_MODULE_2__util_ApplicationException_js__["a" /* ApplicationException */]('Não foi possível obter as negociações da semana retrasada');
    });
  }

  // método para obter negociacoes da semana anterior
  obtemNegociacoesDaSemanaAnterior() {

    return this._http.get(`
          ${"http://localhost:3000"}/negociacoes/anterior`).then(dados => dados.map(objeto => new __WEBPACK_IMPORTED_MODULE_1__Negociacao_js__["a" /* Negociacao */](new Date(objeto.data), objeto.quantidade, objeto.valor)), err => {

      throw new __WEBPACK_IMPORTED_MODULE_2__util_ApplicationException_js__["a" /* ApplicationException */]('Não foi possível obter as negociações da semana anterior');
    });
  }

  obtemNegociacoesDaSemana() {

    return this._http.get(`${"http://localhost:3000"}/negociacoes/semana`).then(dados => dados.map(objeto => new __WEBPACK_IMPORTED_MODULE_1__Negociacao_js__["a" /* Negociacao */](new Date(objeto.data), objeto.quantidade, objeto.valor)), err => {

      throw new __WEBPACK_IMPORTED_MODULE_2__util_ApplicationException_js__["a" /* ApplicationException */]('Não foi possível obter as negociações da semana');
    });
  }

  /* codigo com responsabilidades misturadas
    return new Promise((resolve, reject) => {
        // xhr: para realizar requisições
      const xhr = new XMLHttpRequest();
      // abre uma conexão
      xhr.open("GET", "negociacoes/semana");
        // toda requisição XHR (AJAX) passa por 5 estados
      // 0: requisição ainda não iniciada;
      // 1: conexão com o servidor estabelecida;
      // 2: requisição recebida;
      // 3: processando requisição;
      // 4: requisição está concluída e a resposta está pronta.
      xhr.onreadystatechange = () => {
          if (xhr.readyState == 4) { // a gente precisa da ultima pois ele quem nos dará a resposta
            if (xhr.status == 200) {
              const negociacoes = JSON.parse(xhr.responseText)
              .map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor));
            // this._mensagem.texto = "Negociacoes importadas com sucesso!";
            // passando o callback 
            resolve(null, negociacoes);
          } else {
              console.log(xhr.responseText);
            reject("Não foi possível obter negociações!", null);
          }
        }
      };
        xhr.send(); // executa a requisição
      // fim da promise
    });
  }*/
};

/***/ })

});