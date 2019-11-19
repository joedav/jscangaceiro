// variavel global que guardará os dados da nossa conexão
// const ConnectionFactory = (() => {
// varivael que guarda a store acima da class
const stores = ["negociacoes"];

// variavel connection
let connection = null;

// variavel que ira guardar a funcao original do close
let close = null;

export class ConnectionFactory {

  // instrução para que não seja criado instancias dessa classe no contrutor
  constructor() {

    throw new Error("Não é possível criar instância dessa classe");

  }

  // método statico get connection
  static getConnection() {

    return new Promise((resolve, reject) => {

      // verificação se a connection ja existe
      if (connection) return resolve(connection);

      // variável da abertura da connection
      // indicando o banco e a versão como parametros
      const openRequest = indexedDB.open("jscangaceiro", 2);

      // open onupgradeneeded
      openRequest.onupgradeneeded = e => {

        // cria as stores
        ConnectionFactory._createStores(e.target.result);

      };

      // open onsuccess
      openRequest.onsuccess = e => {

        // variável que guarda a connection
        connection = e.target.result;

        // atribuindo a referencia do metodo close para a variavel
        close = connection.close.bind(connection); // o bind é necessáiro por que apos atribuição ainda precisaremos do connection no escopo da variavel

        // alerta: caso tentem fechar a conexão
        connection.close = e => {
          throw new Error("VocÊ não pode fechar a conexão diretamente!")
        };

        // passa o resultado(connection) para a promise
        resolve(connection);
      };

      // open onerror
      openRequest.onerror = e => {

        console.log(e.target.error);
        // passa o erro para rejewct da promise
        reject(e.target.error.name);

      };
    });
  }

  // método privado so pode ser chamado na propria classe
  static _createStores(connection) {

    // itera no array para construir as stores
    stores.forEach(store => {

      if (connection.objectStoreNames.contains(store))
        connection.deleteObjectStore(store);

      connection.createObjectStore(store, {
        autoIncrement: true

      });
    });
  }

  // método para fechar as conexões
  static closeConnection() {
    if (connection) {
      close();
    }
  }
}
//})();