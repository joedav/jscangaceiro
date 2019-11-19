System.register(['../domain/index.js', '../ui/index.js', '../util/index.js'], function (_export, _context) {
  "use strict";

  var Negociacoes, NegociacaoService, Negociacao, NegociacoesView, MensagemView, Mensagem, DateConverter, getNegociacaoDao, Bind, getExceptionMessage, debounce;
  return {
    setters: [function (_domainIndexJs) {
      Negociacoes = _domainIndexJs.Negociacoes;
      NegociacaoService = _domainIndexJs.NegociacaoService;
      Negociacao = _domainIndexJs.Negociacao;
    }, function (_uiIndexJs) {
      NegociacoesView = _uiIndexJs.NegociacoesView;
      MensagemView = _uiIndexJs.MensagemView;
      Mensagem = _uiIndexJs.Mensagem;
      DateConverter = _uiIndexJs.DateConverter;
    }, function (_utilIndexJs) {
      getNegociacaoDao = _utilIndexJs.getNegociacaoDao;
      Bind = _utilIndexJs.Bind;
      getExceptionMessage = _utilIndexJs.getExceptionMessage;
      debounce = _utilIndexJs.debounce;
    }],
    execute: function () {
      function _asyncToGenerator(fn) {
        return function () {
          var gen = fn.apply(this, arguments);
          return new Promise(function (resolve, reject) {
            function step(key, arg) {
              try {
                var info = gen[key](arg);
                var value = info.value;
              } catch (error) {
                reject(error);
                return;
              }

              if (info.done) {
                resolve(value);
              } else {
                return Promise.resolve(value).then(function (value) {
                  step("next", value);
                }, function (err) {
                  step("throw", err);
                });
              }
            }

            return step("next");
          });
        };
      }

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

      var _dec, _desc, _value, _class;

      let NegociacaoController = (_dec = debounce(), (_class = class NegociacaoController {
        constructor() {
          // $ é o query selector (.bind(document)) siginifica que continuaremos utilizando o documento no contexto desta variavel
          const $ = document.querySelector.bind(document);
          // obtendo os elementos
          this._inputData = $("#data");
          this._inputQuantidade = $("#quantidade");
          this._inputValor = $("#valor"); // a criação dos input no construtor é para criar apenas uma vez

          // negociacoes
          this._negociacoes = new Bind(new Negociacoes(), new NegociacoesView('#negociacoes'),
          // model=>this._negociacoesView.update(model);
          'adiciona', 'esvazia');
          // chamando negocieacoes view
          // this._negociacoesView = new NegociacoesView("#negociacoes");

          // atualizando a view
          // this._negociacoesView.update(this._negociacoes);

          // instanciando a mensagem de modelo
          this._mensagem = new Bind(new Mensagem(), new MensagemView('#mensagemView'), 'texto'
          // model => this._mensagemView.update(model)
          );

          // instancia mensagem view
          // this._mensagemView = new MensagemView("#mensagemView");
          // this._mensagemView.update(this._mensagem);
          // instancia NegociacaoService
          this._service = new NegociacaoService();

          this._init();
        }

        _init() {
          var _this = this;

          return _asyncToGenerator(function* () {

            // sintaxe nova 
            try {

              // obtem a conexão
              const dao = yield getNegociacaoDao();
              // obtem a lista de negociacoes salvas
              const negociacoes = yield dao.listaTodos();

              negociacoes.forEach(function (negociacao) {
                return _this._negociacoes.adiciona(negociacao);
              });
            } catch (err) {
              _this._mensagem.texto = getExceptionMessage(err);
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

              const dao = yield getNegociacaoDao();
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
              _this2._mensagem.texto = getExceptionMessage(err);
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
              const negociacoes = yield _this3._service.obtemNegociacoesDoPeriodo();

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
              _this3._mensagem.texto = getExceptionMessage(err);
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
          return new Negociacao(DateConverter.paraData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
        }

        // metodo apaga para limpar os registros da table
        apaga() {
          var _this4 = this;

          return _asyncToGenerator(function* () {
            /* this._negociacoes.esvazia();
            // this._negociacoesView.update(this._negociacoes);
            this._mensagem.texto = "Negociações apagadas com sucesso!"; */
            try {
              const dao = yield getNegociacaoDao();
              yield dao.apagaTodos();
              _this4._negociacoes.esvazia();
              _this4._mensagem.texto = "Negociações removidas com sucesso!";
            } catch (err) {
              _this4._mensagem.texto = getExceptionMessage(err);
            }
          })();
        }
      }, (_applyDecoratedDescriptor(_class.prototype, 'importaNegociacoes', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'importaNegociacoes'), _class.prototype)), _class));

      _export('NegociacaoController', NegociacaoController);
    }
  };
});
//# sourceMappingURL=NegociacaoController.js.map