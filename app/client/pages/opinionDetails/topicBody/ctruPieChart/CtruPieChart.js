import React from 'react';
import { VictoryPie } from 'victory';
import { Link } from 'react-router-dom';

// import { COLORS } from '../../../../utils/constants';
import defaultConfig from './config';
import { lightenDarkenColor } from '../../../../utils/helpers';

const generateColors = (total, baseColor) => {
  const factor = total / 10;

  return Array(total)
    .fill(null)
    .map((_, index) => lightenDarkenColor(baseColor, index * (8 / factor) - 30 * factor));
};

function normalizeData(grades) {
  const totalCount = grades.reduce((acc, point) => acc + point.count, 0);

  const points = grades.map((point) => ({
    x: point.grade,
    y: point.count / totalCount
  }));

  return points;
}

export default function CtruPieChart({
  changeOpinionLink,
  grades,
  ctruScore,
  config = defaultConfig
}) {
  const {
    size,
    padding,
    innerRadius,
    padAngle,
    labelRadius,
    baseColor,
    emptyColor,
    labels
  } = config;

  const colors = generateColors(grades.length, baseColor);
  const data = normalizeData(grades);

  return (
    <div className="ctru-pie">
      <div className="ctru-pie__wrapper">
        <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%">
          {data.length !== 0 ? (
            <VictoryPie
              standalone={false}
              width={size}
              height={size}
              data={data}
              innerRadius={innerRadius}
              padding={padding}
              padAngle={padAngle}
              labelRadius={labelRadius}
              colorScale={colors}
              style={{ labels }}
            />
          ) : (
            <VictoryPie
              standalone={false}
              width={size}
              height={size}
              data={[{ x: 1, y: 1 }]}
              innerRadius={innerRadius}
              padding={padding}
              padAngle={padAngle}
              labelRadius={labelRadius}
              colorScale={[emptyColor]}
              style={{ labels: { fill: 'transparent' } }}
            />
          )}
        </svg>

        <div className="ctru-pie__label">
          <span className="count">{ctruScore.toFixed(1)}</span>
          <span className="text">Score</span>
        </div>
      </div>

      {changeOpinionLink && (
        <div className="ctru-pie__btns">
          <Link to={changeOpinionLink} className="change-opinion-btn">
            Change your opinion
          </Link>
        </div>
      )}
    </div>
  );
}
