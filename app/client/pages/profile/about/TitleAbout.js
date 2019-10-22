import React from 'react';
import { connect } from 'react-redux';

import authSelectors from '../../../modules/auth/authSelectors';
import CONST from '../../../utils/constants';

const {
  ROLES: { MANAGER }
} = CONST;

const TitleAbout = ({ activeRole }) => (
  <h2 className="info-block__title">{activeRole === MANAGER ? 'Portrait' : 'Biography'}</h2>
);

const mapStateToProps = (state) => ({
  activeRole: authSelectors.activeRole(state)
});

export default connect(mapStateToProps)(TitleAbout);
