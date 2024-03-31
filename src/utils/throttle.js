export function throttle(func, wait) {
  let timeout;
  let lastArgs;
  let lastThis;

  return function() {
    const context = this;
    const args = arguments;

    if (!timeout) {
      lastArgs = args;
      lastThis = context;

      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    } else {
      lastArgs = args;
      lastThis = context;
    }
  };
}
