import React from 'react';

import CircleWithBackground from './CircleWithBackground';
// import ArrowSvg from '../../../../public/assets/svg/sort-up.solid.svg';

const config = {
  size: 300,
  cornerRadius: 25,
  backgroundColor: '#F7F8FA'
};

const circleOuter = {
  padding: 0,
  innerRadius: 300 / 2 - 30,
  color: '#0075B7'
};

const circleInner = {
  padding: {
    top: 35,
    bottom: 35
  },
  innerRadius: (300 - 35 * 2) / 2 - 30,

  color: '#00BFDF'
};

export default function CtruScoreCircle({
  ctruScore,
  companyCtruScore,
  profileLabel,
  reviewsCount
}) {
  const { size } = config;

  const dataOuter = {
    percent: companyCtruScore ? Math.round(companyCtruScore * 10) : Math.round(ctruScore * 10),
    score: companyCtruScore ? companyCtruScore.toFixed(1) : ctruScore.toFixed(1)
  };

  let dataInner = null;

  if (companyCtruScore) {
    dataInner = {
      percent: Math.round(ctruScore * 10),
      score: ctruScore.toFixed(1)
    };
  }

  return (
    <div className="ctru-circle">
      <div className="ctru-circle__chart">
        <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%">
          <CircleWithBackground circle={circleOuter} percent={dataOuter.percent} config={config} />

          {dataInner && (
            <CircleWithBackground
              circle={circleInner}
              percent={dataInner.percent}
              config={config}
            />
          )}
        </svg>

        <div className="ctru-circle__label">
          <span className="count">{dataInner ? dataInner.score : dataOuter.score}</span>
          {/*<span className="diff green">*/}
          {/*  +12.2% <ArrowSvg />*/}
          {/*</span>*/}

          {/*<span className="diff red">*/}
          {/*  +12.2% <ArrowSvg />*/}
          {/*</span>*/}
        </div>
      </div>

      {dataInner && (
        <ul className="ctru-circle__legend">
          <li className="legend-item">
            <span className="point outer" />
            <span className="text">All clients</span>
            <span className="score">{dataOuter.score}</span>
          </li>
          <li className="legend-item">
            <span className="point inner" />
            <span className="text">Clients of {profileLabel}</span>
            <span className="score">{dataInner.score}</span>
          </li>
        </ul>
      )}

      <span className="ctru-circle__info">Based on {reviewsCount} reviews</span>
    </div>
  );
}
