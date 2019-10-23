// client/app/app.js

// instanciando negociacao controller
let controller = new NegociacaoController();

// associando o evento de submissão do form á chamada de método "adiciona"

document
  .querySelector(".form")
  .addEventListener("submit", controller.adiciona.bind(controller));
