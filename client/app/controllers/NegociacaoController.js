class NegociacaoController {
  constructor() {
    // $ é o query selector (.bind(document)) siginifica que continuaremos utilizando o documento no contexto desta variavel
    const $ = document.querySelector.bind(document);
    // obtendo os elementos
    this._inputData = $("#data");
    this._inputQuantidade = $("#quantidade");
    this._inputValor = $("#valor"); // a criação dos input no construtor é para criar apenas uma vez

    // negociacoes
    this._negociacoes = new Bind(
      new Negociacoes(),
      new NegociacoesView('#negociacoes'),
      // model=>this._negociacoesView.update(model);
      'adiciona', 'esvazia'
    );
    // chamando negocieacoes view
    // this._negociacoesView = new NegociacoesView("#negociacoes");

    // atualizando a view
    // this._negociacoesView.update(this._negociacoes);

    // instanciando a mensagem de modelo
    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView('#mensagemView'),
      'texto'
      // model => this._mensagemView.update(model)
    );

    // instancia mensagem view
    // this._mensagemView = new MensagemView("#mensagemView");
    // this._mensagemView.update(this._mensagem);
    // instancia NegociacaoService
    this._service = new NegociacaoService();
  }

  adiciona(event) {
    try {
      // cancelamento da submissão do form
      event.preventDefault();

      // incluindo a negociacao
      this._negociacoes.adiciona(this._criaNegociacao());

      this._mensagem.texto = "Negociacão adicionada com sucesso!";
      // chama o limpar formulario
      this._limpaFormulario();
    } catch (err) {

      console.log(err);
      console.log(err.stack);

      if (err instanceof DataInvalidaException) {

        this._mensagem.texto = err.message;

      } else {

        this._mensagem.texto = 'Um erro não esperado aconteceu. Entre em contato com o suporte';
      }
    }
  }

  // importar negiociações
  importaNegociacoes() {

    this._service
      .obtemNegociacoesDoPeriodo()
      .then(negociacoes => {

        negociacoes.filter(novaNegociacao =>

            !this._negociacoes.paraArray().some(negociacaoExistente =>

              novaNegociacao.equals(negociacaoExistente)))

          .forEach(negociacao => this._negociacoes.adiciona(negociacao));

        this._mensagem.texto = 'Negociações do período importadas com sucesso';
      })
      .catch(err => this._mensagem.texto = err);
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
    return new Negociacao(
      DateConverter.paraData(this._inputData.value),
      parseInt(this._inputQuantidade.value),
      parseFloat(this._inputValor.value)
    );
  }

  // metodo apaga para limpar os registros da table
  apaga() {
    this._negociacoes.esvazia();
    // this._negociacoesView.update(this._negociacoes);
    this._mensagem.texto = "Negociações apagadas com sucesso!";
  }
}