// client/app/app.js

// importação do bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import 'bootstrap/js/modal.js';
import "../css/meucss.css";

import {
  NegociacaoController
} from './controllers/NegociacaoController.js';

$('h1').on('click', () => alert('Foi clicado!'));
// provando a existência da função!
console.log('Função adicionada pelo bootstrap:');
console.log($('h1').modal);

// instanciando negociacao controller
const controller = new NegociacaoController();
/*// alias
const $ = document.querySelector.bind(document);

// associando o evento de submissão do form á chamada de método "adiciona"
$(".form").addEventListener("submit", controller.adiciona.bind(controller));

// botao apagar
$("#botao-apaga").addEventListener("click", controller.apaga.bind(controller));

// botão importa negociações
$("#botao-importa").addEventListener("click", controller.importaNegociacoes.bind(controller));*/

/*const negociacao = new Negociacao(new Date(), 1, 200);
const headers = new Headers();
headers.set('Content-Type', 'application/json');
const body = JSON.stringify(negociacao);
const method = 'POST';

const config = {
  method,
  headers,
  body
};

fetch(`${SERVICE_URL}/negociacoes`, config)
  .then(() => console.log('Dado enviado com sucesso'));*/