// eslint-disable-next-line import/prefer-default-export
export function debounce(f, ms) {
  console.log(1);
  let timer = null;

  return function(...args) {
    console.log(2);
    const onComplete = () => {
      console.log(3);
      f.apply(this, args);
      timer = null;
    };

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(onComplete, ms);
  };
}
