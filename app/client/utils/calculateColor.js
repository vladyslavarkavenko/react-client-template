const calculateColorParam = (param, x, y, width, height, colors) => {
  const { lt, rt, rb, lb } = colors;

  const ltFactor = lt[param] * (width - x) * y;
  const rtFactor = rt[param] * x * y;
  const rbFactor = rb[param] * x * (height - y);
  const lbFactor = lb[param] * (width - x) * (height - y);

  return Math.round((ltFactor + rtFactor + rbFactor + lbFactor) / (width * height));
};

export default function calculateColor(...arg) {
  // arg = { x, y, width, height, colors };
  const r = calculateColorParam('r', ...arg);
  const g = calculateColorParam('g', ...arg);
  const b = calculateColorParam('b', ...arg);

  return `rgb(${r}, ${g}, ${b})`;
}
