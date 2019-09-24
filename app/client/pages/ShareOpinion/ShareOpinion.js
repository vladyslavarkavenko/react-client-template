import React from 'react';

import SimpleContentHeader from '../../components/ui-components/Layout/SimpleContentHeader';
import RateListContainer from './components/RateList/RateListContainer';
import RateDetailsContainer from './components/RateDetails/RateDetailsContainer';

export default function ShareOpinion() {
  return (
    <div className="content share-opinion">
      <SimpleContentHeader title="Share your opinion" />
      <div className="content-body">
        <RateListContainer />
        <RateDetailsContainer />
      </div>
    </div>
  );
}
