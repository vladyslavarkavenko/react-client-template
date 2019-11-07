import React from 'react';
import RateHeader from './rateDetails/RateHeader';
import NewSubjectButton from './rateDetails/NewSubjectButton';
import RateNotification from './rateDetails/RateNotification';
import { LoaderBlock } from '../../../../components/ui-components/Layout/Loader';
import ShareOpinionBlock from './rateDetails/ShareOpinionBlock';
import CreateTopicModal from './rateDetails/CreateTopicModal';
import SubjectItem from './rateDetails/SubjectItem';

export default function RateDetails({
  newTopicShowModal,
  selectedProfile,
  subjectsStatus,
  subjectsData
}) {
  const subjectList = subjectsData.map((sub) => <SubjectItem key={`${sub.id}_sub`} data={sub} />);

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
            {newTopicShowModal && <CreateTopicModal />}

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
