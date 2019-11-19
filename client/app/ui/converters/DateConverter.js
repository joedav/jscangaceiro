System.register(["./DataInvalidaException.js"], function (_export, _context) {
  "use strict";

  var DataInvalidaException;
  return {
    setters: [function (_DataInvalidaExceptionJs) {
      DataInvalidaException = _DataInvalidaExceptionJs.DataInvalidaException;
    }],
    execute: function () {
      let DateConverter = class DateConverter {
        constructor() {
          throw new Error("Esta classe não pode ser instanciada!");
        }

        static paraTxt(data) {
          return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
        }
        static paraData(texto) {
          if (!/\d{2}\/\d{2}\/\d{4}/.test(texto)) throw new DataInvalidaException();

          // lembrnado que o segundo elemento da data sempre é o mes (janeiro 0 dezembro 11)
          // ou seja se eu recebo valor 10 no segundo elemento será necessário decrementar
          // indice % 0 == 0
          // indice % 1 == 1
          // indice % 2 == 0
          return new Date(...texto.split("/").reverse(0).map((item, indice) => item - indice % 2));
        }
      };

      _export("DateConverter", DateConverter);
    }
  };
});
//# sourceMappingURL=DateConverter.js.map