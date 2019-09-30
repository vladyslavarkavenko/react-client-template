import PROPS, { colors } from './chartProperties';
import calculateColor from '../../../utils/calculateColor';

export function calculateBgColor(x, y) {
  const { height, width, padding } = PROPS;

  // Reverse y-axis
  y = height - y;

  // Remove padding
  x -= padding;
  y -= padding;
  const w = width - 2 * padding;
  const h = height - 2 * padding;

  // Adjust final values
  if (x < 0) x = 0;
  if (x > w) x = w;
  if (y < 0) y = 0;
  if (y > h) y = h;

  return calculateColor(x, y, w, h, colors);
}

export function getCoordByPoint({ importance: i, satisfaction: s }) {
  const { height: h, width: w, padding: p, ticks: t } = PROPS;

  const top = ((t - i) * (h - 2 * p)) / t + p;
  const right = ((t - s) * (w - 2 * p)) / t + p;
  const left = w - right;
  const bottom = h - top;

  return { top, right, left, bottom };
}
