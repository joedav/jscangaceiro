// importações
import {
  ApplicationException
} from '../../util/ApplicationException.js';

export class DataInvalidaException extends ApplicationException {
  constructor() {
    super("A data deve estar em formato dd/mm/aaaa");
  }
}