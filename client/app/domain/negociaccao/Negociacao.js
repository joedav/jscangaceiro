// client/app/domain/negociacao/Negociacao.js
class Negociacao {
  constructor(_data, _quantidade, _valor) {
    /*
    this._data = new Date(data.getTime()); // data atual
    this._quantidade = qtd; // quantidade
    this._valor = valor; // valor*/
    // Object.assign() , esse objeto será modificado ganhando as propriedades de um ou mais objetos de origem passados como parâmetro
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
}