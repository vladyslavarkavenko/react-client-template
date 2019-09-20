import React from 'react';
import { connect } from 'react-redux';

import companiesSelectors from '../../../modules/companies/companiesSelectors';

export default (OriginalComponent) => {
  const ForAnalystHOC = (props) => <OriginalComponent {...props} />;

  const mapStateToProps = (state) => ({
    data: companiesSelectors.activeEditCompany(state)
  });

  return connect(mapStateToProps)(ForAnalystHOC);
};
