import React from 'react';
import i18next from 'i18next';
import SimpleHeader from '../../components/ui-components/Layout/SimpleHeader';
import RateListContainer from './subjects/RateListContainer';
import RateDetailsContainer from './subjects/RateDetailsContainer';

export default function Subjects({ match, location }) {
  return (
    <div className="share-opinion">
      <SimpleHeader title={i18next.t('shareOpinion.title')} />
      <div className="content-body">
        <RateListContainer match={match} location={location} />
        <RateDetailsContainer />
      </div>
    </div>
  );
}
