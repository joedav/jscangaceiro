class ProxyFactory {
  static create(objeto, props, armadilha) {
    return new Proxy(objeto, {
      // metodo get disparará toda vez que o objeto negociacoes chamar as funcões adiciona ou esvazia
      get(target, prop, receiver) {
        // se a propriedade do objeto real for igual a uma função e essa propriedade for do tipo adiciona ou esvazia
        // usa o array de props para realizar o includes
        if (ProxyFactory._ehFuncao(target[prop]) && props.includes(prop)) {
          return function () {
            console.log(`"${target[prop]}" disparou a armadilha!`);

            target[prop].apply(target, arguments);
            // target é a instancia real da negociacao
            armadilha(target);
          }
        } else {
          return target[prop];
        }
      },
      set(target, prop, value, receiver) {
        const update = Reflect.set(target, prop, value);

        // só executa a armadilha se fizer parte da lista de propr
        if (props.includes(prop)) armadilha(target);

        return update;
      }
    });
  }

  static _ehFuncao(fn) {
    return typeof (fn) == typeof (Function);
  }
}