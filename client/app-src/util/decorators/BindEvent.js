import {
  obrigatorio
} from '../index.js';

export function bindEvent(event = obrigatorio("event"),
  seletor = obrigatorio("seletor"), prevent = true) {

  return function (target, propertyKey, descriptor) {

    Reflect.defineMetadata("bindEvent", {
      event,
      seletor,
      prevent,
      propertyKey
    }, Object.getPrototypeOf(target), propertyKey);

    return descriptor;
  }
}