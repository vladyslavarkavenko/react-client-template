import React from 'react';
import RateHeader from './RateHeader';
import NewSubjectButton from './NewSubjectButton';
import RateNotification from './RateNotification';
import SubjectItem from './SubjectItem';
import Loader from '../../../../components/ui-components/Layout/Loader';

export default function RateDetails({ selectedProfile, subjectsStatus, subjectsData }) {
  const subjectList = subjectsData.map((sub) => <SubjectItem data={sub} />);

  return (
    <div className="rate-details">
      <RateHeader profile={selectedProfile} />
      {subjectsStatus === 'request' ? (
        <Loader />
      ) : (
        <ul className="details-list">
          <RateNotification />
          <NewSubjectButton />

          {subjectList}
        </ul>
      )}
    </div>
  );
}
