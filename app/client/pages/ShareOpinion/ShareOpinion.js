import React from 'react';

import SimpleContentHeader from '../../components/ui-components/Layout/SimpleContentHeader';

import RateListHeading from './components/RateListHeading';
import RateListItem from './components/RateListItem';
import SelectedAccountHeader from './components/SelectedAccountHeader';
import NewSubjectButton from './components/NewSubjectButton';
import RateNotification from './components/RateNotification';
import SubjectItem from './components/SubjectItem';

export default function Profile() {
  return (
    <div className="content share-opinion">
      <SimpleContentHeader title="Share your opinion" />
      <div className="content-body">
        <ul className="rate-list">
          <RateListHeading>My companies</RateListHeading>

          <RateListItem />
          <RateListItem isActive withAlert />
          <RateListItem />

          <RateListHeading>My managers</RateListHeading>
          <RateListItem />
          <RateListItem withAlert />
        </ul>
        <div className="rate-details">
          <SelectedAccountHeader title="Rene Meier" link="/random" />
          <ul className="details-list">
            <NewSubjectButton />
            <RateNotification />

            <SubjectItem isActive />
            <SubjectItem />
            <SubjectItem />
          </ul>
        </div>
      </div>
    </div>
  );
}
