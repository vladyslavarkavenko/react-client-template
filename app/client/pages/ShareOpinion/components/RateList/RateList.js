import React from 'react';
import RateListHeading from './RateListHeading';
import RateListItem from './RateListItem';

export default function RateList({ companies, managers, selected, handleSelect }) {
  console.log(companies, managers);

  const companiesList = companies.map((company) => (
    <RateListItem data={company} selected={selected} handleSelect={handleSelect} isCompany />
  ));

  const managersList = managers.map((manager) => (
    <RateListItem data={manager} selected={selected} handleSelect={handleSelect} />
  ));

  return (
    <ul className="rate-list">
      <RateListHeading>My companies</RateListHeading>
      {companiesList}

      <RateListHeading>My managers</RateListHeading>
      {managersList}
    </ul>
  );
}
