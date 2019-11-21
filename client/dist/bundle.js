webpackJsonp([1],[
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Bind_js__ = __webpack_require__(18);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Bind_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ConnectionFactory_js__ = __webpack_require__(7);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__DaoFactory_js__ = __webpack_require__(19);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_2__DaoFactory_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ApplicationException_js__ = __webpack_require__(4);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_3__ApplicationException_js__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__HttpService_js__ = __webpack_require__(11);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ProxyFactory_js__ = __webpack_require__(6);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__decorators_Debounce_js__ = __webpack_require__(20);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_6__decorators_Debounce_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__decorators_Constroller_js__ = __webpack_require__(21);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_7__decorators_Constroller_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Obrigatorio_js__ = __webpack_require__(22);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_8__Obrigatorio_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__decorators_BindEvent_js__ = __webpack_require__(23);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_9__decorators_BindEvent_js__["a"]; });











/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return View; });
let View = class View {

  constructor(seletor) {

    this._elemento = document.querySelector(seletor);
  }

  update(model) {
    this._elemento.innerHTML = this.template(model);
  }

  template(model) {
    throw new Error("Você precisa implementar o método template!");
  }
};

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Negociacao; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_index_js__ = __webpack_require__(1);


let Negociacao = class Negociacao {
  constructor(_data = __WEBPACK_IMPORTED_MODULE_0__util_index_js__["g" /* obrigatorio */]("data"), _quantidade = __WEBPACK_IMPORTED_MODULE_0__util_index_js__["g" /* obrigatorio */]("quantidade"), _valor = __WEBPACK_IMPORTED_MODULE_0__util_index_js__["g" /* obrigatorio */]("valor")) {

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

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApplicationException; });
/* unused harmony export isApplicationException */
/* harmony export (immutable) */ __webpack_exports__["b"] = getExceptionMessage;
let ApplicationException = class ApplicationException extends Error {
  constructor(msg = "") {
    super(msg);
    this.name = this.constructor.name;
  }
};

const exception = ApplicationException;
function isApplicationException(err) {
  return err instanceof exception || Object.getPrototypeOf(err) instanceof exception;
}

function getExceptionMessage(err) {
  if (isApplicationException(err)) {
    return err.message;
  } else {
    console.log(err);
    return 'Não foi possível realizar a operação.';
  }
}

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProxyFactory; });
let ProxyFactory = class ProxyFactory {
  static create(objeto, props, armadilha) {
    return new Proxy(objeto, {
      // metodo get disparará toda vez que o objeto negociacoes chamar as funcões adiciona ou esvazia
      get(target, prop, receiver) {
        // se a propriedade do objeto real for igual a uma função e essa propriedade for do tipo adiciona ou esvazia
        // usa o array de props para realizar o includes
        if (ProxyFactory._ehFuncao(target[prop]) && props.includes(prop)) {
          return function () {
            console.log(`"${target[prop]}" disparou a armadilha!`);

            target[prop].apply(target, arguments);
            // target é a instancia real da negociacao
            armadilha(target);
          };
        } else {
          return target[prop];
        }
      },
      set(target, prop, value, receiver) {
        const update = Reflect.set(target, prop, value);

        // só executa a armadilha se fizer parte da lista de propr
        if (props.includes(prop)) armadilha(target);

        return update;
      }
    });
  }

  static _ehFuncao(fn) {
    return typeof fn == typeof Function;
  }
};

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectionFactory; });
// variavel global que guardará os dados da nossa conexão
// const ConnectionFactory = (() => {
// varivael que guarda a store acima da class
const stores = ["negociacoes"];

// variavel connection
let connection = null;

// variavel que ira guardar a funcao original do close
let close = null;

let ConnectionFactory = class ConnectionFactory {

  // instrução para que não seja criado instancias dessa classe no contrutor
  constructor() {

    throw new Error("Não é possível criar instância dessa classe");
  }

  // método statico get connection
  static getConnection() {

    return new Promise((resolve, reject) => {

      // verificação se a connection ja existe
      if (connection) return resolve(connection);

      // variável da abertura da connection
      // indicando o banco e a versão como parametros
      const openRequest = indexedDB.open("jscangaceiro", 2);

      // open onupgradeneeded
      openRequest.onupgradeneeded = e => {

        // cria as stores
        ConnectionFactory._createStores(e.target.result);
      };

      // open onsuccess
      openRequest.onsuccess = e => {

        // variável que guarda a connection
        connection = e.target.result;

        // atribuindo a referencia do metodo close para a variavel
        close = connection.close.bind(connection); // o bind é necessáiro por que apos atribuição ainda precisaremos do connection no escopo da variavel

        // alerta: caso tentem fechar a conexão
        connection.close = e => {
          throw new Error("VocÊ não pode fechar a conexão diretamente!");
        };

        // passa o resultado(connection) para a promise
        resolve(connection);
      };

      // open onerror
      openRequest.onerror = e => {

        console.log(e.target.error);
        // passa o erro para rejewct da promise
        reject(e.target.error.name);
      };
    });
  }

  // método privado so pode ser chamado na propria classe
  static _createStores(connection) {

    // itera no array para construir as stores
    stores.forEach(store => {

      if (connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);

      connection.createObjectStore(store, {
        autoIncrement: true

      });
    });
  }

  // método para fechar as conexões
  static closeConnection() {
    if (connection) {
      close();
    }
  }
};
//})();

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NegociacaoDao; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Negociacao_js__ = __webpack_require__(3);
// importações


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
          const negociacao = new __WEBPACK_IMPORTED_MODULE_0__Negociacao_js__["a" /* Negociacao */](atual.value._data, atual.value._quantidade, atual.value._valor);

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

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DateConverter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DataInvalidaException_js__ = __webpack_require__(10);
// importações


let DateConverter = class DateConverter {
  constructor() {
    throw new Error("Esta classe não pode ser instanciada!");
  }

  static paraTxt(data) {
    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
  }
  static paraData(texto) {
    if (!/\d{2}\/\d{2}\/\d{4}/.test(texto)) throw new __WEBPACK_IMPORTED_MODULE_0__DataInvalidaException_js__["a" /* DataInvalidaException */]();

    // lembrnado que o segundo elemento da data sempre é o mes (janeiro 0 dezembro 11)
    // ou seja se eu recebo valor 10 no segundo elemento será necessário decrementar
    // indice % 0 == 0
    // indice % 1 == 1
    // indice % 2 == 0
    return new Date(...texto.split("/").reverse(0).map((item, indice) => item - indice % 2));
  }
};

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataInvalidaException; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_ApplicationException_js__ = __webpack_require__(4);
// importações


let DataInvalidaException = class DataInvalidaException extends __WEBPACK_IMPORTED_MODULE_0__util_ApplicationException_js__["a" /* ApplicationException */] {
  constructor() {
    super("A data deve estar em formato dd/mm/aaaa");
  }
};

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpService; });
let HttpService = class HttpService {

  _handleErrors(res) {

    if (!res.ok) throw new Error(res.statusText);
    return res;
  }

  get(url) {

    return fetch(url).then(res => this._handleErrors(res)).then(res => res.json());

    /* formato de requisição com Promise/XMLHttpRequest
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest(); // variavel da request
      xhr.open('GET', url); // abertura para requisições
        // quando houver mudança no status de requisições
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) { // resultado OK
            resolve(JSON.parse(xhr.responseText)); // converte o resultado em objeto json
          } else {
            // caso seja um erro
            console.log(xhr.responseText);
            reject(xhr.responseText);
          }
        }
      };
      xhr.send(); // envia o resultado para a chamada
    });*/
  }
};

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bootstrap_dist_css_bootstrap_css__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bootstrap_dist_css_bootstrap_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bootstrap_dist_css_bootstrap_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bootstrap_dist_css_bootstrap_theme_css__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bootstrap_dist_css_bootstrap_theme_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_bootstrap_dist_css_bootstrap_theme_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bootstrap_js_modal_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bootstrap_js_modal_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_bootstrap_js_modal_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__css_meucss_css__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__css_meucss_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__css_meucss_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__controllers_NegociacaoController_js__ = __webpack_require__(16);
// client/app/app.js

// importação do bootstrap








$('h1').on('click', () => alert('Foi clicado!'));
// provando a existência da função!
console.log('Função adicionada pelo bootstrap:');
console.log($('h1').modal);

// instanciando negociacao controller
const controller = new __WEBPACK_IMPORTED_MODULE_4__controllers_NegociacaoController_js__["a" /* NegociacaoController */]();
/*// alias
const $ = document.querySelector.bind(document);

// associando o evento de submissão do form á chamada de método "adiciona"
$(".form").addEventListener("submit", controller.adiciona.bind(controller));

// botao apagar
$("#botao-apaga").addEventListener("click", controller.apaga.bind(controller));

// botão importa negociações
$("#botao-importa").addEventListener("click", controller.importaNegociacoes.bind(controller));*/

/*const negociacao = new Negociacao(new Date(), 1, 200);
const headers = new Headers();
headers.set('Content-Type', 'application/json');
const body = JSON.stringify(negociacao);
const method = 'POST';

const config = {
  method,
  headers,
  body
};

fetch(`${SERVICE_URL}/negociacoes`, config)
  .then(() => console.log('Dado enviado com sucesso'));*/
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 14 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 15 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NegociacaoController; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__domain__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(1);
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _desc, _value, _class2;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}





let NegociacaoController = (_dec = __WEBPACK_IMPORTED_MODULE_2__util__["c" /* controller */]('#data', '#quantidade', '#valor'), _dec2 = __WEBPACK_IMPORTED_MODULE_2__util__["b" /* bindEvent */]('submit', '.form'), _dec3 = __WEBPACK_IMPORTED_MODULE_2__util__["d" /* debounce */](), _dec4 = __WEBPACK_IMPORTED_MODULE_2__util__["b" /* bindEvent */]("click", "#botao-importa"), _dec5 = __WEBPACK_IMPORTED_MODULE_2__util__["d" /* debounce */](), _dec6 = __WEBPACK_IMPORTED_MODULE_2__util__["b" /* bindEvent */]("click", "#botao-apaga"), _dec(_class = (_class2 = class NegociacaoController {
  constructor(_inputData, _inputQuantidade, _inputValor) {

    Object.assign(this, {
      _inputData,
      _inputQuantidade,
      _inputValor
    });

    // negociacoes
    this._negociacoes = new __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Bind */](new __WEBPACK_IMPORTED_MODULE_0__domain__["b" /* Negociacoes */](), new __WEBPACK_IMPORTED_MODULE_1__ui__["d" /* NegociacoesView */]('#negociacoes'),
    // model=>this._negociacoesView.update(model);
    'adiciona', 'esvazia');
    // chamando negocieacoes view
    // this._negociacoesView = new NegociacoesView("#negociacoes");

    // atualizando a view
    // this._negociacoesView.update(this._negociacoes);

    // instanciando a mensagem de modelo
    this._mensagem = new __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Bind */](new __WEBPACK_IMPORTED_MODULE_1__ui__["b" /* Mensagem */](), new __WEBPACK_IMPORTED_MODULE_1__ui__["c" /* MensagemView */]('#mensagemView'), 'texto'
    // model => this._mensagemView.update(model)
    );

    // instancia mensagem view
    // this._mensagemView = new MensagemView("#mensagemView");
    // this._mensagemView.update(this._mensagem);
    // instancia NegociacaoService
    // this._service = new NegociacaoService();

    this._init();
  }

  _init() {
    var _this = this;

    return _asyncToGenerator(function* () {

      // sintaxe nova 
      try {

        // obtem a conexão
        const dao = yield __WEBPACK_IMPORTED_MODULE_2__util__["f" /* getNegociacaoDao */]();
        // obtem a lista de negociacoes salvas
        const negociacoes = yield dao.listaTodos();

        negociacoes.forEach(function (negociacao) {
          return _this._negociacoes.adiciona(negociacao);
        });
      } catch (err) {
        _this._mensagem.texto = __WEBPACK_IMPORTED_MODULE_2__util__["e" /* getExceptionMessage */](err);
      }
      /* sintaxe antiga bloqueante
      // chamanod daofactory para que busque todas as negociacoes salvas
      getNegociacaoDao()
        .then(dao => dao.listaTodos())
        .then(negociacoes => negociacoes.forEach(negociacao =>
          this._negociacoes.adiciona(negociacao)))
        .catch(err => this._mensagem.texto = err);*/
    })();
  }

  adiciona(event) {
    var _this2 = this;

    return _asyncToGenerator(function* () {

      try {
        // cancelamento da submissão do form
        event.preventDefault();

        // negociação que precisamos incluir no banco e na tabela
        const negociacao = _this2._criaNegociacao();

        const dao = yield __WEBPACK_IMPORTED_MODULE_2__util__["f" /* getNegociacaoDao */]();
        yield dao.adiciona(negociacao);

        // incluindo a negociacao
        _this2._negociacoes.adiciona(negociacao);

        _this2._mensagem.texto = "Negociacão adicionada com sucesso!";

        // chama o limpar formulario
        _this2._limpaFormulario();
      } catch (err) {
        /*
        console.log(err);
        console.log(err.stack);
          if (err instanceof DataInvalidaException) {
        */
        _this2._mensagem.texto = __WEBPACK_IMPORTED_MODULE_2__util__["e" /* getExceptionMessage */](err);
        /*
              } else {
                  this._mensagem.texto = 'Um erro não esperado aconteceu. Entre em contato com o suporte';
              }*/
      }
    })();
  }

  // importar negiociações
  importaNegociacoes() {
    var _this3 = this;

    return _asyncToGenerator(function* () {

      try {
        // lazyload
        const {
          NegociacaoService
        } = yield __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 45));

        // criando instancia de negociacao service
        const service = new NegociacaoService();

        const negociacoes = yield service.obtemNegociacoesDoPeriodo();

        console.log(negociacoes);
        negociacoes.filter(function (novaNegociacao) {
          return !_this3._negociacoes.paraArray().some(function (negociacaoExistente) {
            return novaNegociacao.equals(negociacaoExistente);
          });
        }).forEach(function (negociacao) {
          return _this3._negociacoes.adiciona(negociacao);
        });

        _this3._mensagem.texto = 'Negociações do período importadas com sucesso';
      } catch (err) {
        _this3._mensagem.texto = __WEBPACK_IMPORTED_MODULE_2__util__["e" /* getExceptionMessage */](err);
      }
    })();
  }

  /*
  const negociacoes = [];
  this._service.obterNegociacoesDaSemana().then(semana => {
    negociacoes.push(...semana);
    // quando retornamos uma promise, seu retorno é acessível ao encadear uma chamada á then
    return this._service.obterNegociacoesDaSemanaAnterior();
  }).then(anterior => {
    negociacoes.push(...anterior);
    negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao));
    return this._service.obterNegociacoesDaSemanaRetrasada();
  }).then(retrasada => {
    negociacoes.push(...retrasada);
    negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao));
    this._mensagem.texto = "Negociações importadas com sucesso!";
  }).catch(err => this._mensagem.texto = err);
    /*this._service.obterNegociacoesDaSemana().then(negociacoes => {
       negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao));
       this._mensagem.texto = 'Negociações importadas com sucesso!';
     },
     err => this._mensagem.texto = err
   );
   /*this._service.obterNegociacoesDaSemana((err, negociacoes) => {
     if (err) {
       this._mensagem.texto = "Não foi possível obter as negociações da semana!";
       return;
     }
     negociacoes.forEach(negociacao => {
       this._negociacoes.adiciona(negociacao);
       this._mensagem.texto = "Negociações importadas com sucesso!";
     })
   });*/

  // método para limpar o formulário
  _limpaFormulario() {
    this._inputData.value = "";
    this._inputQuantidade.value = "";
    this._inputValor.value = "";
    this._inputData.focus();
  }

  // metodo que cria a negociacao
  _criaNegociacao() {
    // iretornando uma instanci de negociacao
    return new __WEBPACK_IMPORTED_MODULE_0__domain__["a" /* Negociacao */](__WEBPACK_IMPORTED_MODULE_1__ui__["a" /* DateConverter */].paraData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
  }

  // metodo apaga para limpar os registros da table

  apaga() {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      /* this._negociacoes.esvazia();
      // this._negociacoesView.update(this._negociacoes);
      this._mensagem.texto = "Negociações apagadas com sucesso!"; */
      try {
        const dao = yield __WEBPACK_IMPORTED_MODULE_2__util__["f" /* getNegociacaoDao */]();
        yield dao.apagaTodos();
        _this4._negociacoes.esvazia();
        _this4._mensagem.texto = "Negociações removidas com sucesso!";
      } catch (err) {
        _this4._mensagem.texto = __WEBPACK_IMPORTED_MODULE_2__util__["e" /* getExceptionMessage */](err);
      }
    })();
  }
}, (_applyDecoratedDescriptor(_class2.prototype, 'adiciona', [_dec2, _dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'adiciona'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'importaNegociacoes', [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, 'importaNegociacoes'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'apaga', [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, 'apaga'), _class2.prototype)), _class2)) || _class);

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__negociacao_Negociacao_js__ = __webpack_require__(3);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__negociacao_Negociacao_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__negociacao_NegociacaoDao_js__ = __webpack_require__(8);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__negociacao_Negociacoes_js__ = __webpack_require__(24);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__negociacao_Negociacoes_js__["a"]; });


// export * from './negociacao/NegociacaoService.js';


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Bind; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ProxyFactory_js__ = __webpack_require__(6);
// importações


let Bind = class Bind {

  constructor(model, view, ...props) {

    const proxy = __WEBPACK_IMPORTED_MODULE_0__ProxyFactory_js__["a" /* ProxyFactory */].create(model, props, model => {
      view.update(model);
    });

    view.update(model);

    return proxy;
  }
};

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getNegociacaoDao; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ConnectionFactory__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__domain_negociacao_NegociacaoDao__ = __webpack_require__(8);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// importações



// O método getNegociacaoDao() retorna uma Promise que, ao ser
// resolvida, nos dá acesso a uma instância de NegociacaoDao
let getNegociacaoDao = (() => {
  var _ref = _asyncToGenerator(function* () {
    let conn = yield __WEBPACK_IMPORTED_MODULE_0__ConnectionFactory__["a" /* ConnectionFactory */].getConnection();
    return new __WEBPACK_IMPORTED_MODULE_1__domain_negociacao_NegociacaoDao__["a" /* NegociacaoDao */](conn);
  });

  return function getNegociacaoDao() {
    return _ref.apply(this, arguments);
  };
})();

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = debounce;
function debounce(milisegundos = 500) {
  return (target, key, descriptor) => {
    const metodoOriginal = descriptor.value;

    let timer = 0;
    descriptor.value = function (...args) {
      clearTimeout(timer);

      timer = setTimeout(() => metodoOriginal.apply(this, args), milisegundos);
    };
    return descriptor;
  };
}

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = controller;
function controller(...seletores) {

  // lista com elementos DOM
  const elementos = seletores.map(seletor => document.querySelector(seletor));

  return function (constructor) {
    const constutorOriginal = constructor;

    const constructorNovo = function () {

      // guarda a uma referencia para a instância
      const instance = new constutorOriginal(...elementos);

      // verifica cada propriedade da classe
      Object.getOwnPropertyNames(constutorOriginal.prototype).forEach(property => {
        if (Reflect.hasMetadata("bindEvent", instance, property)) {
          associaEvento(instance, Reflect.getMetadata("bindEvent", instance, property));
        }
      });
    };
    // ajustanto prototype
    constructorNovo.prototype = constutorOriginal.prototype;

    // retornando o novo construtor;
    return constructorNovo;
  };
}

function associaEvento(instance, metadado) {
  document.querySelector(metadado.seletor).addEventListener(metadado.event, event => {
    if (metadado.prevent) event.preventDefault();
    instance[metadado.propertyKey](event);
  });
}

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = obrigatorio;
function obrigatorio(parametro) {
  throw new Error(`${parametro} é um parâmetro obrigatório!`);
}

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = bindEvent;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_js__ = __webpack_require__(1);


function bindEvent(event = __WEBPACK_IMPORTED_MODULE_0__index_js__["g" /* obrigatorio */]("event"), seletor = __WEBPACK_IMPORTED_MODULE_0__index_js__["g" /* obrigatorio */]("seletor"), prevent = true) {

  return function (target, propertyKey, descriptor) {

    Reflect.defineMetadata("bindEvent", {
      event,
      seletor,
      prevent,
      propertyKey
    }, Object.getPrototypeOf(target), propertyKey);

    return descriptor;
  };
}

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Negociacoes; });
let Negociacoes = class Negociacoes {
  constructor() {
    this._negociacoes = [];

    // this._armadilha = armadilha;

    // congelando a instancia
    Object.freeze(this);
  }

  adiciona(negociacao) {
    this._negociacoes.push(negociacao);

    // chamando a função
    // this._armadilha(this);
  }

  paraArray() {
    return [].concat(this._negociacoes);
  }

  // método get para obter o total de todas as negociacoes
  get volumeTotal() {
    let total = 0;

    // o calculo será feito através da propriedade volume de cada negociacao atribuindo o valor ao montante de total
    /* for (let i = 0; i < this._negociacoes.length; i++) {
      total += this._negociacoes[i].volume;
    } */

    // reduce passa por todos os itens do nosso array e incrementa ao total o volume de cada item
    return this._negociacoes.reduce((total, negociacao) => total + negociacao.volume, 0);
  }

  // método esvazia
  esvazia() {
    this._negociacoes.length = 0;

    // chamando a function
    // this._armadilha(this);
  }
};

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__views_MensagemView_js__ = __webpack_require__(26);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__views_MensagemView_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_NegociacoesView_js__ = __webpack_require__(27);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_1__views_NegociacoesView_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_View_js__ = __webpack_require__(2);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_Mesagem_js__ = __webpack_require__(28);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__models_Mesagem_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__converters_DataInvalidaException_js__ = __webpack_require__(10);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__converters_DateConverter_js__ = __webpack_require__(9);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_5__converters_DateConverter_js__["a"]; });







/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MensagemView; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__View_js__ = __webpack_require__(2);
// importações


let MensagemView = class MensagemView extends __WEBPACK_IMPORTED_MODULE_0__View_js__["a" /* View */] {
  // template
  template(model) {

    return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : `<p></p>`;
  }
};

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NegociacoesView; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__View_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__converters_DateConverter_js__ = __webpack_require__(9);
// importações



let NegociacoesView = class NegociacoesView extends __WEBPACK_IMPORTED_MODULE_0__View_js__["a" /* View */] {

  template(model) {
    return `
    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th>DATA</th>
          <th>QUANTIDADE</th>
          <th>VALOR</th>
          <th>VOLUME</th>
        </tr>
      </thead>

      <tbody>
        ${model.paraArray().map(negociacao =>
    // dentro da tbody irá ser inserido uma nova linha (tr) que conterá as td(table data) da nossa negociação
    `
          <tr>
            <td>${__WEBPACK_IMPORTED_MODULE_1__converters_DateConverter_js__["a" /* DateConverter */].paraTxt(negociacao.data)}</td>
            <td>${negociacao.qtd}</td>
            <td>${negociacao.valor}</td>
            <td>${negociacao.volume}</td>
          </tr>
          `).join("")}
      </tbody>

      <tfoot>
      <tr>
          <td colspan="3" style="text-align: right"><b>Total</b></td>
          <td>${model.volumeTotal}</td>
      </tr>
      </tfoot>
    </table>`;
  }
};

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Mensagem; });
let Mensagem = class Mensagem {
  constructor(texto = "") {
    // caso o texto esteja vázio
    this._texto = texto;
  }

  // get do texto
  get texto() {
    return this._texto;
  }

  // set do texto
  set texto(texto) {
    this._texto = texto;
  }
};

/***/ })
],[12]);