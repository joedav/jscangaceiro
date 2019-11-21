export class HttpService {

  _handleErrors(res) {

    if (!res.ok) throw new Error(res.statusText);
    return res;
  }

  get(url) {

    return fetch(url)
      .then(res => this._handleErrors(res))
      .then(res => res.json());

    /* formato de requisição com Promise/XMLHttpRequest
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest(); // variavel da request
      xhr.open('GET', url); // abertura para requisições

      // quando houver mudança no status de requisições
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) { // resultado OK
            resolve(JSON.parse(xhr.responseText)); // converte o resultado em objeto json
          } else {
            // caso seja um erro
            console.log(xhr.responseText);
            reject(xhr.responseText);
          }
        }
      };
      xhr.send(); // envia o resultado para a chamada
    });*/
  }
}