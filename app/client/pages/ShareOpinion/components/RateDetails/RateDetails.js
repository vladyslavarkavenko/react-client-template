import React from 'react';
import RateHeader from './RateHeader';
import NewSubjectButton from './NewSubjectButton';
import RateNotification from './RateNotification';
import { LoaderBlock } from '../../../../components/ui-components/Layout/Loader';
import SubjectItemContainer from '../Subject/SubjectItemContainer';
import ShareOpinionBlock from './ShareOpinionBlock';

export default function RateDetails({
  selectedProfile,

  subjectsStatus,
  subjectsData
}) {
  const subjectList = subjectsData.map((sub) => (
    <SubjectItemContainer key={`${sub.id}_sub`} data={sub} />
  ));

  return (
    <div className="rate-details">
      <RateHeader profile={selectedProfile} />
      <ul className="details-list">
        {subjectsStatus === 'request' ? (
          <div className="details-list__preloader">
            <LoaderBlock height="50vh" />
          </div>
        ) : (
          <>
            <RateNotification />
            <NewSubjectButton />
            {subjectList}

            <ShareOpinionBlock />
          </>
        )}
      </ul>
    </div>
  );
}
