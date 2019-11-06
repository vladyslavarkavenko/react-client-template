import React from 'react';
import { connect } from 'react-redux';

import BlockWrapper from '../../components/widgets/BlockWrapper';
import SatisfiedClients from '../../components/widgets/SatisfiedClients';
import authSelectors from '../../modules/auth/authSelectors';

function SatisfiedContainer({ satisfaction }) {
  return (
    <BlockWrapper className="no-border">
      <SatisfiedClients satisfaction={satisfaction} />
    </BlockWrapper>
  );
}

const mapStateToProps = (state) => {
  const { satisfaction } = authSelectors.user(state);

  return { satisfaction };
};

export default connect(mapStateToProps)(SatisfiedContainer);
