export class Negociacoes {
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
    return this._negociacoes.reduce((total, negociacao) =>
      total + negociacao.volume, 0);
  }

  // método esvazia
  esvazia() {
    this._negociacoes.length = 0;

    // chamando a function
    // this._armadilha(this);
  }
}