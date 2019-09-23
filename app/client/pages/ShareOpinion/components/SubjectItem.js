import React from 'react';
import ListArrowDownSvg from '../../../../../public/assets/svg/arrow-down.svg';
import ExclamationCircleEmptySvg from '../../../../../public/assets/svg/exclamation-circle-empty.svg';
import TopicItem from './TopicItem';

export default function SubjectItem({ isActive }) {
  return (
    <li className={`details-list__subject ${isActive ? 'active' : ''}`}>
      <div className="subject-main">
        <span className="subject-arrow">
          <ListArrowDownSvg />
        </span>
        <div className="subject-img">
          <img src={`https://picsum.photos/300/300?${Math.random()}`} alt="" />
        </div>

        <div className="subject-info">
          <div className="subject-title">
            Banker
            <span>
              <ExclamationCircleEmptySvg />
            </span>
          </div>
          <div className="subject-count">7 of 25</div>
          <div className="subject-progress-bar">
            <div className="fill-bar" style={{ width: '30%' }} />
          </div>
        </div>
      </div>

      {isActive && (
        <ul className="topics-list">
          <TopicItem withAlert key="abc" title="Banking" />
          <TopicItem key="abc1" title="Random" withAlert />

          <TopicItem key="abc2" title="Random 2" />
        </ul>
      )}
    </li>
  );
}
