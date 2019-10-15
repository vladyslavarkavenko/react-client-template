import React from 'react';

import InfoLine from './contacts/InfoLine';
import { INFO_LINE_TYPES } from '../../../utils/constants';

const { NUMBER, SITE, EMAIL } = INFO_LINE_TYPES;

// eslint-disable-next-line react/prefer-stateless-function
const Contacts = ({ phone, web, email, isEdit, errors, onChange }) => {
  const commonProps = { isEdit, errors, onChange };

  return (
    <div>
      {typeof phone !== 'undefined' && <InfoLine {...commonProps} type={NUMBER} data={phone} />}
      {typeof web !== 'undefined' && <InfoLine {...commonProps} type={SITE} data={web} />}
      {typeof email !== 'undefined' && <InfoLine {...commonProps} type={EMAIL} data={email} />}
    </div>
  );
};

export default Contacts;
