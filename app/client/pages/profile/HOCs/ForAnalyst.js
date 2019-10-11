import React from 'react';
import { connect } from 'react-redux';

import companiesSelectors from '../../../modules/companies/companiesSelectors';
import profileSelectors from '../../../modules/profile/profileSelectors';
import { getRadarScores } from '../../../modules/profile/profileActions';

export default (OriginalComponent) => {
  const ForAnalystHOC = (props) => <OriginalComponent {...props} />;

  const mapStateToProps = (state) => ({
    grades: profileSelectors.grades(state),
    data: companiesSelectors.activeEditCompany(state),
    avgSatisfaction: profileSelectors.avgSatisfaction(state)
  });

  return connect(
    mapStateToProps,
    { getRadarScores }
  )(ForAnalystHOC);
};
