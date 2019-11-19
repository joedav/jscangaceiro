System.register([], function (_export, _context) {
  "use strict";

  var campos, tbody, btnSubmit;


  function limpaCampos(campos) {
    for (campo of campos) {
      campo.value = "";
    }
  }
  return {
    setters: [],
    execute: function () {
      campos = [document.querySelector("#data"), document.querySelector("#valor"), document.querySelector("#quantidade")];
      tbody = document.querySelector("table tbody");
      btnSubmit = document.querySelector("[type=submit]");


      // quando o form for submetido ele dispara o evento
      document.querySelector(".form").addEventListener("submit", event => {
        // cria uma tr que conterá as td's
        var tr = document.createElement("tr");
        // for para adicionar todos os campos
        campos.forEach(campo => {
          // cria o td
          var td = document.createElement("td");
          // atribui o valor do campo na td
          td.textContent = campo.value;
          // poe a td na tr
          tr.appendChild(td);
        });
        // td para armazenar volume da negociação
        var tdVolume = document.createElement("td");
        // as posicoes 1 e 2 do campos armazena a quatidade e o valor da negociacao
        tdVolume.textContent = campos[1].value * campos[2].value;
        // adiciona o tdVolume a tr
        tr.appendChild(tdVolume);
        // adiciona a tr inteira na tbody
        tbody.appendChild(tr);
        // anulando o evento de submição do formulário
        event.preventDefault();
        // chama a função para limpar os campos
        limpaCampos(campos);
        // coloca o foco no campo da data
        campos[0].focus();
      });
    }
  };
});
//# sourceMappingURL=index.js.map