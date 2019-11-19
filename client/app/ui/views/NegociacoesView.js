System.register(['./View.js', '../converters/DateConverter.js'], function (_export, _context) {
  "use strict";

  var View, DateConverter;
  return {
    setters: [function (_ViewJs) {
      View = _ViewJs.View;
    }, function (_convertersDateConverterJs) {
      DateConverter = _convertersDateConverterJs.DateConverter;
    }],
    execute: function () {
      let NegociacoesView = class NegociacoesView extends View {

        template(model) {
          return `
    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th>DATA</th>
          <th>QUANTIDADE</th>
          <th>VALOR</th>
          <th>VOLUME</th>
        </tr>
      </thead>

      <tbody>
        ${model.paraArray().map(negociacao =>
          // dentro da tbody irá ser inserido uma nova linha (tr) que conterá as td(table data) da nossa negociação
          `
          <tr>
            <td>${DateConverter.paraTxt(negociacao.data)}</td>
            <td>${negociacao.qtd}</td>
            <td>${negociacao.valor}</td>
            <td>${negociacao.volume}</td>
          </tr>
          `).join("")}
      </tbody>

      <tfoot>
      <tr>
          <td colspan="3" style="text-align: right"><b>Total</b></td>
          <td>${model.volumeTotal}</td>
      </tr>
      </tfoot>
    </table>`;
        }
      };

      _export('NegociacoesView', NegociacoesView);
    }
  };
});
//# sourceMappingURL=NegociacoesView.js.map