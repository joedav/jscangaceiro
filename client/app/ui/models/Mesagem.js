System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
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

      _export("Mensagem", Mensagem);
    }
  };
});
//# sourceMappingURL=Mesagem.js.map