import React from 'react';
import i18next from 'i18next';
import SimpleContentHeader from '../../components/ui-components/Layout/SimpleContentHeader';
import RateListContainer from './subjects/RateListContainer';
import RateDetailsContainer from './subjects/RateDetailsContainer';

export default function Subjects({ match }) {
  return (
    <div className="share-opinion">
      <SimpleContentHeader title={i18next.t('shareOpinion.title')} />
      <div className="content-body">
        <RateListContainer match={match} />
        <RateDetailsContainer />
      </div>
    </div>
  );
}
