import React from 'react';
import { ROLES } from '../../constants';

import SvgAdmin from '../../../../public/assets/svg/admin.svg';
import SvgAnalyst from '../../../../public/assets/svg/analyst.svg';
import SvgCustomer from '../../../../public/assets/svg/customer.svg';
import SvgManager from '../../../../public/assets/svg/manager.svg';

const { CUSTOMER, ADMIN, ANALYST, MANAGER } = ROLES;

const Icon = ({ role }) => {
  switch (role) {
    case CUSTOMER:
      return <SvgCustomer />;
    case ADMIN:
      return <SvgAdmin />;
    case ANALYST:
      return <SvgAnalyst />;
    case MANAGER:
      return <SvgManager />;
    default:
      return null;
  }
};

export default Icon;
