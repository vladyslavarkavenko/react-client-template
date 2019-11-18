/* eslint-disable */
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import opinionDetailsSelectors from '../../../modules/opinionDetails/opinionDetailsSelectors';
import CtruPieChart from './ctruPieChart/CtruPieChart';
import { withRouter } from 'react-router-dom';
import routing from '../../../utils/routing';

const mapStateToProps = (state, { match: { path, params } }) => {
  const selectedCriteriaId = opinionDetailsSelectors.selectedCriteria(state);
  const selectedSubjectId = opinionDetailsSelectors.selectedSubject(state);
  const selectedTopic = opinionDetailsSelectors.selectedTopic(state);

  const status = opinionDetailsSelectors.getTopicGradesStatus(state);
  const ctruScore = opinionDetailsSelectors.getTopicCtruScore(state);
  const grades = opinionDetailsSelectors.getTopicGrades(state);

  let changeOpinionLink;

  if (path !== routing().myOpinionDetails && selectedSubjectId && selectedTopic) {
    const { id, type } = params;
    changeOpinionLink = routing({
      id,
      type,
      subjectId: selectedSubjectId,
      topicId: selectedTopic.topicId
    }).shareOpinionWithProfile;
  }

  return {
    status,
    grades,
    ctruScore,
    selectedCriteriaId,
    selectedSubjectId,
    selectedTopic,
    changeOpinionLink
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps)
)(CtruPieChart);
