System.register(["../index.js"], function (_export, _context) {
  "use strict";

  var obrigatorio;
  function bindEvent(event = obrigatorio("event"), seletor = obrigatorio("seletor"), prevent = true) {

    return function (target, propertyKey, descriptor) {

      Reflect.defineMetadata("bindEvent", {
        event,
        seletor,
        prevent,
        propertyKey
      }, Object.getPrototypeOf(target), propertyKey);

      return descriptor;
    };
  }

  _export("bindEvent", bindEvent);

  return {
    setters: [function (_indexJs) {
      obrigatorio = _indexJs.obrigatorio;
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=BindEvent.js.map