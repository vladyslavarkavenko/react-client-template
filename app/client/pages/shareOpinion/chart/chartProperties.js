const PROPS = {
  ticks: 10,
  padding: 50,
  height: 600,
  width: 1500,
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
  lt: { r: 255, g: 0, b: 0 }, //    left-top
  rt: { r: 255, g: 153, b: 0 }, //  right-top
  rb: { r: 51, g: 204, b: 51 }, //  right-bottom
  lb: { r: 51, g: 51, b: 255 } //   left-bottom
};

export { allPoints, colors };
