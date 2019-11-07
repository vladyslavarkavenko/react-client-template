import React from 'react';
import { connect } from 'react-redux';

import opinionDetailsSelectors from '../../modules/opinionDetails/opinionDetailsSelectors';
import ParticipationCircle from '../../components/widgets/ParticipationCircle';
import BlockWrapper from '../../components/widgets/BlockWrapper';

function ParticipationCircleContainer({ data, status }) {
  const { numberGrades: numberOpinions, participationShare } = data;

  return (
    <BlockWrapper>
      <ParticipationCircle data={{ numberOpinions, participationShare }} status={status} />
    </BlockWrapper>
  );
}

const mapStateToProps = (state) => {
  const { data, status } = opinionDetailsSelectors.participation(state);

  return { data, status };
};

export default connect(mapStateToProps)(ParticipationCircleContainer);
