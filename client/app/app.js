System.register(["./controllers/NegociacaoController.js"], function (_export, _context) {
  "use strict";

  var NegociacaoController;
  return {
    setters: [function (_controllersNegociacaoControllerJs) {
      NegociacaoController = _controllersNegociacaoControllerJs.NegociacaoController;
    }],
    execute: function () {

      // instanciando negociacao controller
      const controller = new NegociacaoController();
      // alias
      // client/app/app.js
      const $ = document.querySelector.bind(document);

      // associando o evento de submissão do form á chamada de método "adiciona"
      $(".form").addEventListener("submit", controller.adiciona.bind(controller));

      // botao apagar
      $("#botao-apaga").addEventListener("click", controller.apaga.bind(controller));

      // botão importa negociações
      $("#botao-importa").addEventListener("click", controller.importaNegociacoes.bind(controller));
    }
  };
});
//# sourceMappingURL=app.js.map