import React from 'react';

import InfoLine from './contacts/InfoLine';
import { INFO_LINE_TYPES } from '../../../utils/constants';

const { NUMBER, SITE, EMAIL } = INFO_LINE_TYPES;

// eslint-disable-next-line react/prefer-stateless-function
class Contacts extends React.Component {
  render() {
    const { phone, web, email, ...rest } = this.props;

    return (
      <div>
        {typeof phone !== 'undefined' && <InfoLine {...rest} type={NUMBER} data={phone} />}
        {typeof web !== 'undefined' && <InfoLine {...rest} type={SITE} data={web} />}
        {typeof email !== 'undefined' && <InfoLine {...rest} type={EMAIL} data={email} />}
      </div>
    );
  }
}

export default Contacts;
