class Mensagem {
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
}