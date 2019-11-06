import React from 'react';
import { connect } from 'react-redux';

import profileSelectors from '../../modules/profile/profileSelectors';
import SatisfiedClients from '../../components/widgets/SatisfiedClients';

const SatisfiedClientsWrapper = ({ avgSatisfaction }) => (
  <SatisfiedClients avgSatisfaction={avgSatisfaction} />
);

const mapStateToProps = (state) => ({
  avgSatisfaction: profileSelectors.avgSatisfaction(state)
});

export default connect(mapStateToProps)(SatisfiedClientsWrapper);
