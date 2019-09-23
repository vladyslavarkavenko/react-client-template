import React from 'react';
import { ROLES } from '../../../utils/constants';

import SvgAdmin from '../../../../../public/assets/svg/admin.svg';
import SvgAnalyst from '../../../../../public/assets/svg/analyst.svg';
import SvgCustomer from '../../../../../public/assets/svg/customer.svg';
import SvgManager from '../../../../../public/assets/svg/manager.svg';

const { CUSTOMER, ADMIN, ANALYST, MANAGER } = ROLES;

const ChooseRoleIcon = ({ role }) => {
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

export default ChooseRoleIcon;
