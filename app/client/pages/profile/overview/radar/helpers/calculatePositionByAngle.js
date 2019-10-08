import { PROPS } from '../../const';

const { a, p } = PROPS;

const defPoint = {
  x: a - p,
  y: a / 2
};

export default function calculatePositionByAngle(angle, point = defPoint) {
  const center = {
    x: a / 2,
    y: a / 2
  };

  const s = Math.sin(angle);
  const c = Math.cos(angle);

  const left = c * (point.x - center.x) - s * (point.y - center.y) + center.x;
  const bottom = s * (point.x - center.x) + c * (point.y - center.y) + center.y;

  return {
    left,
    bottom,
    top: a - bottom,
    right: a - left
  };
}
