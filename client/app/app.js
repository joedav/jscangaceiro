System.register(['./controllers/NegociacaoController.js', './domain/index.js'], function (_export, _context) {
  "use strict";

  var NegociacaoController, Negociacao;
  return {
    setters: [function (_controllersNegociacaoControllerJs) {
      NegociacaoController = _controllersNegociacaoControllerJs.NegociacaoController;
    }, function (_domainIndexJs) {
      Negociacao = _domainIndexJs.Negociacao;
    }],
    execute: function () {

      // instanciando negociacao controller
      // client/app/app.js
      const controller = new NegociacaoController();
      /*// alias
      const $ = document.querySelector.bind(document);
      
      // associando o evento de submissão do form á chamada de método "adiciona"
      $(".form").addEventListener("submit", controller.adiciona.bind(controller));
      
      // botao apagar
      $("#botao-apaga").addEventListener("click", controller.apaga.bind(controller));
      
      // botão importa negociações
      $("#botao-importa").addEventListener("click", controller.importaNegociacoes.bind(controller));*/

      const negociacao = new Negociacao(new Date(), 1, 200);
      const headers = new Headers();
      headers.set('Content-Type', 'application/json');
      const body = JSON.stringify(negociacao);
      const method = 'POST';

      const config = {
        method,
        headers,
        body
      };

      fetch('/negociacoes', config).then(() => console.log('Dado enviado com sucesso'));
    }
  };
});
//# sourceMappingURL=app.js.map