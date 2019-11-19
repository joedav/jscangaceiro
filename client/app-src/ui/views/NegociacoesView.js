// importações
import {
  View
} from './View.js';
import {
  DateConverter
} from '../converters/DateConverter.js';

export class NegociacoesView extends View {

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
        ${model.paraArray().map(negociacao=>
          // dentro da tbody irá ser inserido uma nova linha (tr) que conterá as td(table data) da nossa negociação
          `
          <tr>
            <td>${DateConverter.paraTxt(negociacao.data)}</td>
            <td>${negociacao.qtd}</td>
            <td>${negociacao.valor}</td>
            <td>${negociacao.volume}</td>
          </tr>
          `
        ).join("")}
      </tbody>

      <tfoot>
      <tr>
          <td colspan="3" style="text-align: right"><b>Total</b></td>
          <td>${model.volumeTotal}</td>
      </tr>
      </tfoot>
    </table>`
  }
}