export function debounce(milisegundos = 500) {
  return (target, key, descriptor) => {
    const metodoOriginal = descriptor.value;

    let timer = 0;
    descriptor.value = function (...args) {
      clearTimeout(timer);

      timer = setTimeout(() => metodoOriginal.apply(this, args), milisegundos);
    }
    return descriptor;
  }
}