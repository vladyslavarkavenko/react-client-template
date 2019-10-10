import React from 'react';
import { connect } from 'react-redux';
import BlockWrapper from '../../profile/components/BlockWrapper';
import SatisfiedClients from '../../profile/overview/SatisfiedClients';
import managerSelectors from '../../../modules/managerProfile/managerProfileSelectors';
import { LoaderBlock } from '../../../components/ui-components/Layout/Loader';

function SatisfiedClientsContainer({ status, data }) {
  if (status === 'failure') {
    return null;
  }

  return (
    <BlockWrapper>
      {status === 'request' ? (
        <LoaderBlock height="20vh" />
      ) : (
        <SatisfiedClients satisfiedClients={data} />
      )}
    </BlockWrapper>
  );
}

const mapStateToProps = (state) => {
  const { status, data } = managerSelectors.satisfaction(state);

  return { status, data };
};

export default connect(mapStateToProps)(SatisfiedClientsContainer);
