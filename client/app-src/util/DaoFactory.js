// importações
import {
  ConnectionFactory
} from './ConnectionFactory.js';
import {
  NegociacaoDao
} from '../domain/negociacao/NegociacaoDao.js'

// O método getNegociacaoDao() retorna uma Promise que, ao ser
// resolvida, nos dá acesso a uma instância de NegociacaoDao
export async function getNegociacaoDao() {
  let conn = await ConnectionFactory.getConnection();
  return new NegociacaoDao(conn);
}