import React from 'react';
import { connect } from 'react-redux';
import BlockWrapper from '../../../components/widgets/BlockWrapper';
import SatisfiedClients from '../../../components/widgets/SatisfiedClients';
import companiesSelectors from '../../../modules/companies/companiesSelectors';

function SatisfiedClientsContainer({ avgSatisfaction }) {
  return (
    <BlockWrapper className="no-border">
      <SatisfiedClients avgSatisfaction={avgSatisfaction} />
    </BlockWrapper>
  );
}

const mapStateToProps = (state, props) => {
  const {
    match: {
      params: { id }
    }
  } = props;
  const { avgSatisfaction } = companiesSelectors.getCurrentManager(state, id);

  return { avgSatisfaction };
};

export default connect(mapStateToProps)(SatisfiedClientsContainer);
