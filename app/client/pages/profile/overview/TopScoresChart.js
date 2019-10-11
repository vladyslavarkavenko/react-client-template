import React from 'react';
import RateItem from './topScores/RateItem';

/* eslint-disable */
const mockData = [
  {
    topicId: 326,
    topicName: 'Fast onboading',
    min: 4.0,
    max: 6.0,
    median: 5.0,
    customerRate: 6.0
  },
  {
    topicId: 220,
    topicName: 'User-friendly',
    min: 7,
    max: 9,
    median: 7.5,
    customerRate: 5.5
  },
  {
    topicId: 301,
    topicName: 'Comprehensive prospectus',
    min: 5.0,
    max: 9,
    median: 5.0,
    customerRate: 5.0
  },
  {
    topicId: 277,
    topicName: 'Reliable',
    min: 6,
    max: 7,
    median: 5.0,
    customerRate: 5.0
  },
  {
    topicId: 300,
    topicName: 'Low fees',
    min: 3,
    max: 5,
    median: 4.5,
    customerRate: 4.5
  },
  {
    topicId: 285,
    topicName: 'Clean',
    min: 9,
    max: 10,
    median: 4.5,
    customerRate: 4.6
  },
  {
    topicId: 291,
    topicName: 'Latest lay out concept',
    min: 2.5,
    max: 5.0,
    median: 3.75,
    customerRate: 2.5
  },
  {
    topicId: 288,
    topicName: 'Good security',
    min: 2.0,
    max: 4.0,
    median: 3.0,
    customerRate: 4.0
  },
  {
    topicId: 282,
    topicName: 'Privacy',
    min: 1.0,
    max: 6.0,
    median: 3.5,
    customerRate: 6.0
  }
];

const SidebarItem = ({ title }) => (
  <li className="sidebar-item">
    <span>{title}</span>
  </li>
);

export default function TopScoresChart({ data }) {
  const sidebarList = [];
  const rateList = [];

  data.slice(0, 10).forEach(({ min, max, median, customerRate, topicId, topicName }) => {
    sidebarList.push(<SidebarItem key={`${topicId}_c_s`} title={topicName} />);
    rateList.push(
      <RateItem
        key={`${topicId}_c_r`}
        min={min}
        max={max}
        median={median}
        customerRate={customerRate}
      />
    );
  });

  return (
    <div className="top-scores">
      <div className="top-scores__container">
        <ul className="top-scores__sidebar">{sidebarList}</ul>
        <ul className="top-scores__main">{rateList}</ul>
      </div>
      <div className="legend-wrapper">
        <div className="legend-spacer" />
        <div className="legend-container">
          <div className="legend-content">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
            <span>9</span>
            <span>10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
