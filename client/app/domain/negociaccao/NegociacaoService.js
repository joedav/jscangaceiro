class NegociacaoService {
  constructor() {
    // propriedade
    this._http = new HttpService();
  }

  obtemNegociacoesDoPeriodo() {
    // ACESSA AOS PRÓPRIOS MÉTODOS ATRAVÉS DE THIS
    return Promise.all([
        this.obtemNegociacoesDaSemana(),
        this.obtemNegociacoesDaSemanaAnterior(),
        this.obtemNegociacoesDaSemanaRetrasada()
      ])
      .then(periodo => periodo
        .reduce((novoArray, item) => novoArray.concat(item), [])
        .sort((a, b) => b.data.getTime() - a.data.getTime())
      )
      .catch(err => {

        console.log(err);
        throw new Error('Não foi possível obter as negociações do período')
      });
  }


  // metodo que obtem as negociacoes da semana retrasada
  obtemNegociacoesDaSemanaRetrasada() {

    return this._http
      .get('negociacoes/retrasada')
      .then(
        dados => dados.map(objeto =>
          new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)),
        err => {
          throw new Error('Não foi possível obter as negociações da semana retrasada');
        }
      );
  }


  // método para obter negociacoes da semana anterior
  obtemNegociacoesDaSemanaAnterior() {

    return this._http
      .get('negociacoes/anterior')
      .then(
        dados => dados.map(objeto =>
          new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)),
        err => {

          throw new Error('Não foi possível obter as negociações da semana anterior');
        }
      );
  }

  obtemNegociacoesDaSemana() {

    return this._http
      .get('negociacoes/semana')
      .then(
        dados =>
        dados.map(objeto =>
          new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)),
        err => {

          throw new Error('Não foi possível obter as negociações da semana');
        }
      );
  }

  /* codigo com responsabilidades misturadas
    return new Promise((resolve, reject) => {

      // xhr: para realizar requisições
      const xhr = new XMLHttpRequest();
      // abre uma conexão
      xhr.open("GET", "negociacoes/semana");

      // toda requisição XHR (AJAX) passa por 5 estados
      // 0: requisição ainda não iniciada;
      // 1: conexão com o servidor estabelecida;
      // 2: requisição recebida;
      // 3: processando requisição;
      // 4: requisição está concluída e a resposta está pronta.
      xhr.onreadystatechange = () => {

        if (xhr.readyState == 4) { // a gente precisa da ultima pois ele quem nos dará a resposta

          if (xhr.status == 200) {

            const negociacoes = JSON.parse(xhr.responseText)
              .map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor));
            // this._mensagem.texto = "Negociacoes importadas com sucesso!";
            // passando o callback 
            resolve(null, negociacoes);
          } else {

            console.log(xhr.responseText);
            reject("Não foi possível obter negociações!", null);
          }
        }
      };

      xhr.send(); // executa a requisição
      // fim da promise
    });
  }*/
}