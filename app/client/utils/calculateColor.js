const defaultColors = {
  lt: { r: 255, g: 0, b: 0 }, //    left-top
  rt: { r: 255, g: 153, b: 0 }, //  right-top
  rb: { r: 51, g: 204, b: 51 }, //  right-bottom
  lb: { r: 51, g: 51, b: 255 }, //   left-bottom

  l: { r: 255, g: 0, b: 0 }, //   left-bottom
  r: { r: 0, g: 255, b: 0 } //  right-bottom
};

export const calculateColorByPointHSL = (point, maxValue, color = {}) => {
  const { l = 120, r = 360 } = color;

  const hue = ((maxValue - point + 1) * (r - l)) / maxValue + l;

  return `hsl(${hue}, 50%, 50%)`;
};

const calculateColorParam = (param, x, y, width, height, colors = defaultColors) => {
  const { lt, rt, rb, lb } = colors;

  const ltFactor = lt[param] * (width - x) * y;
  const rtFactor = rt[param] * x * y;
  const rbFactor = rb[param] * x * (height - y);
  const lbFactor = lb[param] * (width - x) * (height - y);

  return Math.round((ltFactor + rtFactor + rbFactor + lbFactor) / (width * height));
};

function createRGB(...arg) {
  const r = calculateColorParam('r', ...arg);
  const g = calculateColorParam('g', ...arg);
  const b = calculateColorParam('b', ...arg);

  return `rgb(${r}, ${g}, ${b})`;
}

export default function calculateColor(x, y, width, height) {
  const halfWidth = width / 2;

  let colors;
  if (x < halfWidth) {
    colors = {
      lt: { r: 180, g: 0, b: 0 },
      rt: { r: 240, g: 220, b: 0 },
      rb: { r: 255, g: 255, b: 100 },
      lb: { r: 255, g: 100, b: 100 }
    };
  } else {
    x -= halfWidth;
    colors = {
      lt: { r: 240, g: 220, b: 0 },
      rt: { r: 0, g: 180, b: 0 },
      rb: { r: 100, g: 255, b: 100 },
      lb: { r: 255, g: 255, b: 100 }
    };
  }

  return createRGB(x, y, halfWidth, height, colors);
}
