// importações
import {
  View
} from './View.js';

export class MensagemView extends View {
  // template
  template(model) {

    return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : `<p></p>`;
  }
}