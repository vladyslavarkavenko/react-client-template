import React from 'react';
import RateItem from './RateItem';

const SidebarItem = ({ title }) => (
  <li className="sidebar-item">
    <span>{title}</span>
  </li>
);

const mockData = [
  {
    id: 1,
    name: 'Zebulen Form',
    score: 3.1
  },
  {
    id: 2,
    name: 'Dorine Welfare',
    score: 1.8
  },
  {
    id: 3,
    name: 'Arri Picard',
    score: 4.4
  },
  {
    id: 4,
    name: 'Alayne Culbard',
    score: 2.8
  },
  {
    id: 5,
    name: 'Laraine Auten',
    score: 2.2
  },
  {
    id: 6,
    name: 'Devinne Cornish',
    score: 7.5
  },
  {
    id: 7,
    name: 'Olympie Ralling',
    score: 7.9
  },
  {
    id: 8,
    name: 'Hayley Fermin',
    score: 8.9
  },
  {
    id: 9,
    name: 'Armstrong Malser',
    score: 6.1
  },
  {
    id: 10,
    name: 'Sayres Schoffler',
    score: 6.7
  },
  {
    id: 11,
    name: 'Kayle Blofeld',
    score: 7.3
  },
  {
    id: 12,
    name: 'Sebastiano Troyes',
    score: 7.9
  },
  {
    id: 13,
    name: 'Rubin Broster',
    score: 2.8
  },
  {
    id: 14,
    name: 'Ilsa Danelet',
    score: 7.3
  },
  {
    id: 15,
    name: 'Con Cockle',
    score: 3.9
  },
  {
    id: 16,
    name: 'Charline Jellico',
    score: 4.4
  },
  {
    id: 17,
    name: 'Pedro Farnill',
    score: 5.1
  },
  {
    id: 18,
    name: 'Sela Covell',
    score: 9.2
  },
  {
    id: 19,
    name: 'Sheilakathryn Wiersma',
    score: 10.0
  },
  {
    id: 20,
    name: 'Claudetta McCutcheon',
    score: 4.1
  },
  {
    id: 21,
    name: 'Curcio Allner',
    score: 9.6
  },
  {
    id: 22,
    name: 'Robina MacCleod',
    score: 8.6
  },
  {
    id: 23,
    name: 'Cyrill Minguet',
    score: 1.2
  },
  {
    id: 24,
    name: 'Fred Geffcock',
    score: 3.5
  },
  {
    id: 25,
    name: 'Marcelia Vuitton',
    score: 9.4
  }
];

export default function BenchmarkChart({ data = mockData }) {
  const sidebarList = [];
  const rateList = [];

  data
    .sort((a, b) => b.score - a.score)
    .forEach(({ id, score, name }) => {
      sidebarList.push(<SidebarItem key={`${id}_b_u`} title={name} />);
      rateList.push(<RateItem key={`${id}_b_r`} score={score} />);
    });

  return (
    <div className="benchmark-scores">
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
