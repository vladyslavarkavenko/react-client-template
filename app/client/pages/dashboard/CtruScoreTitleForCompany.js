import React from 'react';
import { connect } from 'react-redux';

import companiesSelectors from '../../modules/companies/companiesSelectors';

const CtruScoreTitleForCompany = ({ company: { name } }) => (
  <h2 className="info-block__title">cTRU score for {name}</h2>
);

const mapStateToProps = (state) => ({
  company: companiesSelectors.getCurrentCompany(state)
});

export default connect(mapStateToProps)(CtruScoreTitleForCompany);
