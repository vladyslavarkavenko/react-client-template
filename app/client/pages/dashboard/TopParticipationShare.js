import React from 'react';

const rand = (min = 0, max = 10) =>
  (Math.floor(Math.random() * (max - min) * 10) / 10 + min).toFixed(1);

const colors = [
  [235, 200, 91].join(','),
  [98, 189, 111].join(','),
  [68, 163, 219].join(','),
  [188, 115, 228].join(','),
  [255, 150, 11].join(','),
  [245, 121, 121].join(','),
  [46, 208, 172].join(',')
];

const UpArrow = ({ style }) => (
  <span className="arrow" style={style}>
    ↑
  </span>
);
const DownArrow = ({ style }) => (
  <span className="arrow" style={style}>
    ↓
  </span>
);

const TopParticipationShare = ({ showIndicator = true }) => (
  <div className="top-3">
    {[3, 1, 2].map(() => {
      const s = rand();
      const c = Math.floor(rand(0, colors.length - 1));
      const style = {
        color: `rgb(${colors[c]})`,
        background: `rgb(${colors[c]}, 0.1)`
      };

      return (
        <div className="d-flex info-item">
          <p style={style}>Subject-Topic-{rand()}</p>
          {showIndicator && (
            <p className="indicator text-bold" style={style}>
              {rand()}
            </p>
          )}
          {s > 5 ? (
            <span style={{ color: '#2bbd73' }}>
              {rand()}
              <UpArrow style={{ color: '#2bbd73' }} />
            </span>
          ) : (
            <span style={{ color: '#dd2f54' }}>
              {rand()}
              <DownArrow style={{ color: '#dd2f54' }} />
            </span>
          )}
        </div>
      );
    })}
  </div>
);

export default TopParticipationShare;
