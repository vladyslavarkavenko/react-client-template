const PROPS = {
  ticks: 10,
  padding: 50,
  heightFactor: 0.9,
  widthFactor: 0.78,
  maxBubbleSize: 70,
  minBubbleSize: 10,
  activeBubbleSize: 5,
  tooltipTriggerRadius: 50
};
export default PROPS;

const { ticks: t } = PROPS;

const allPoints = [];
for (let i = 1; i <= t; i += 1) {
  for (let s = 1; s <= t; s += 1) {
    allPoints.push({
      importance: i,
      satisfaction: s
    });
  }
}

const colors = {
  lt: { r: 204, g: 0, b: 0 }, //  left-top
  rt: { r: 0, g: 204, b: 0 }, //  right-top
  rb: { r: 153, g: 255, b: 153 }, //  right-bottom
  lb: { r: 255, g: 153, b: 153 } //   left-bottom
};

export { allPoints, colors };
