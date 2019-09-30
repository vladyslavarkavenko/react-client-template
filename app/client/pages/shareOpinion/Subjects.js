import React from 'react';

import SimpleContentHeader from '../../components/ui-components/Layout/SimpleContentHeader';
import RateListContainer from './subjects/RateListContainer';
import RateDetailsContainer from './subjects/RateDetailsContainer';

export default function Subjects() {
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
