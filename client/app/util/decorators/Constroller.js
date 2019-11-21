System.register([], function (_export, _context) {
  "use strict";

  function controller(...seletores) {

    // lista com elementos DOM
    const elementos = seletores.map(seletor => document.querySelector(seletor));

    return function (constructor) {
      const constutorOriginal = constructor;

      const constructorNovo = function () {

        // guarda a uma referencia para a instância
        const instance = new constutorOriginal(...elementos);

        // verifica cada propriedade da classe
        Object.getOwnPropertyNames(constutorOriginal.prototype).forEach(property => {
          if (Reflect.hasMetadata("bindEvent", instance, property)) {
            associaEvento(instance, Reflect.getMetadata("bindEvent", instance, property));
          }
        });
      };
      // ajustanto prototype
      constructorNovo.prototype = constutorOriginal.prototype;

      // retornando o novo construtor;
      return constructorNovo;
    };
  }

  _export("controller", controller);

  function associaEvento(instance, metadado) {
    document.querySelector(metadado.seletor).addEventListener(metadado.event, event => {
      if (metadado.prevent) event.preventDefault();
      instance[metadado.propertyKey](event);
    });
  }
  return {
    setters: [],
    execute: function () {}
  };
});
//# sourceMappingURL=Constroller.js.map