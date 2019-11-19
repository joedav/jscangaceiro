// client/app/app.js
import {
  NegociacaoController
} from './controllers/NegociacaoController.js';

// instanciando negociacao controller
const controller = new NegociacaoController();
// alias
const $ = document.querySelector.bind(document);

// associando o evento de submissão do form á chamada de método "adiciona"
$(".form").addEventListener("submit", controller.adiciona.bind(controller));

// botao apagar
$("#botao-apaga").addEventListener("click", controller.apaga.bind(controller));

// botão importa negociações
$("#botao-importa").addEventListener("click", controller.importaNegociacoes.bind(controller));