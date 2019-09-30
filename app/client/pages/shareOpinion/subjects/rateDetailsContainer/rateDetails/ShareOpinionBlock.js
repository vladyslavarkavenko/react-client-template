import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import shareOpinionSelectors from '../../../../../modules/shareOpinion/shareOpinionSelectors';
import routing from '../../../../../utils/routing';
import ButtonFullBlock from '../../../../../components/ui-components/Form/ButtonFullBlock';

function ShareOpinionBlock({ selectedTopicsId, history }) {
  const count = selectedTopicsId.length;

  if (!count) {
    return null;
  }

  const title = `Share opinion on ${count} ${count > 1 ? 'topics' : 'topic'}`;

  return (
    <ButtonFullBlock title={title} handleClick={() => history.push(routing().shareOpinionChart)} />
  );
}

const mapStateToProps = (state) => ({
  selectedTopicsId: shareOpinionSelectors.selectedTopicsId(state)
});

export default withRouter(connect(mapStateToProps)(ShareOpinionBlock));
