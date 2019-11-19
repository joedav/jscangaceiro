System.register([], function (_export, _context) {
  "use strict";

  function debounce(fn, milisegundos) {

    let timer = 0;
    return () => {
      // reseta o ultimo timer definido
      clearTimeout(timer);
      // este clear funcionará caso o usuario clique outra vez no botao
      // ele resetará e começará novamente, assim evitando varias chamadas a funcao de uma vez


      // a variavel timer ganha um novo id de um temporizador
      // e afeta a variavel do escopo da funcao debounce
      // usa o temporizador para chamar fn apos os milisegundos 
      timer = setTimeout(() => fn(), milisegundos);
    };
  }

  _export("debounce", debounce);

  return {
    setters: [],
    execute: function () {}
  };
});
//# sourceMappingURL=Debounce.js.map