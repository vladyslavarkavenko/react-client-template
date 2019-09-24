import React from 'react';
import RateHeader from './RateHeader';
import NewSubjectButton from './NewSubjectButton';
import RateNotification from './RateNotification';
import SubjectItem from './SubjectItem';
import { LoaderBlock } from '../../../../components/ui-components/Layout/Loader';

export default function RateDetails({
  selectedProfile,
  selectedTopicsId,

  subjectsStatus,
  subjectsData,

  selectOpinionTopic
}) {
  const subjectList = subjectsData.map((sub) => (
    <SubjectItem
      key={`${sub.id}_sub`}
      data={sub}
      handleSelect={selectOpinionTopic}
      selectedTopicsId={selectedTopicsId}
    />
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
          </>
        )}
      </ul>
    </div>
  );
}
