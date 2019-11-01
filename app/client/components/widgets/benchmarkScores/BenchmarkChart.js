import React from 'react';
import RateItem from './RateItem';
import Legend from './Legend';

const SidebarItem = ({ title }) => (
  <li className="sidebar-item">
    <span>{title}</span>
  </li>
);

export default function BenchmarkChart({ selected = [], staff }) {
  const sidebarList = [];
  const rateList = [];

  staff
    .sort((a, b) => b.ctruScore - a.ctruScore)
    .forEach(({ id, ctruScore, topics, fullName }) => {
      sidebarList.push(<SidebarItem key={`${id}_b_u`} title={fullName} />);
      rateList.push(
        <RateItem
          key={`${id}_b_r`}
          ctruScore={ctruScore}
          topics={topics}
          selected={selected}
          staffId={id}
        />
      );
    });

  return (
    <div
      className={`benchmark-scores ${
        selected.length ? `lines-${selected.length} lines-multiple` : ''
      }`}
    >
      <Legend selected={selected} />
      <div className="benchmark-scores__container">
        <ul className="benchmark-scores__sidebar">{sidebarList}</ul>
        <ul className="benchmark-scores__main">{rateList}</ul>
      </div>
      <div className="legend-wrapper">
        <div className="legend-spacer" />
        <div className="legend-container">
          <div className="legend-content">
            {Array(10)
              .fill(null)
              .map((item, index) => (
                <span key={`${index}_bench_legend`}>{index + 1}</span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
