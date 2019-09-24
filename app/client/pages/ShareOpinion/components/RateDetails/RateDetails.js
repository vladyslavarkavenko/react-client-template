import React from 'react';
import RateHeader from './RateHeader';
import NewSubjectButton from './NewSubjectButton';
import RateNotification from './RateNotification';
import SubjectItem from './SubjectItem';
import { LoaderImg } from '../../../../components/ui-components/Layout/Loader';
// import Loader from '../../../../components/ui-components/Layout/Loader';

export default function RateDetails({ selectedProfile, subjectsStatus, subjectsData }) {
  const subjectList = subjectsData.map((sub) => <SubjectItem data={sub} />);

  return (
    <div className="rate-details">
      <RateHeader profile={selectedProfile} />
      <ul className="details-list">
        {subjectsStatus === 'request' ? (
          <div className="details-list__preloader">
            {/*some text*/}
            <LoaderImg />
          </div>
        ) : (
          <>
            <RateNotification />
            <NewSubjectButton />
            {subjectList}
          </>
        )}
      </ul>
    </div>
  );
}
