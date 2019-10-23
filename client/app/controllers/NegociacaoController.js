class NegociacaoController {
  constructor() {
    // $ é o query selector (.bind(document)) siginifica que continuaremos utilizando o documento no contexto desta variavel
    let $ = document.querySelector.bind(document);

    // obtendo os elementos
    this._inputData = $("#data");
    this._inputQuantidade = $("#quantidade");
    this._inputValor = $("#valor");
    // a criação dos input no construtor é para criar apenas uma vez
  }

  adiciona(event) {
    // cancelamento da submissão do form
    event.preventDefault();
    /*
    // instancia da negociacao
    let negociacao = new Negociacao(
      this._inputData.value,
      this._inputData.value,
      this._inputValor.value
    );*/
    let data = new Date(
      ...this._inputData.value.split("-").map(function(item, indice) {
        // if (indice == 1) {
        // caso esteja no indice segundo elemento (mes) decrementa 1 pois o array de meses inicia em 0
        return item - (indice % 2);
        // 0 % 2; // módulo é 0
        // 1 % 2; // módulo é 1
        // 2 % 2; // módulo é 0
        //}
      })
    );
    // precisamos acessar as propriedades através de this
    console.log(data);
  }
}
