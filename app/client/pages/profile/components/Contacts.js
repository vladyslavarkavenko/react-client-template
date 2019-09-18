import React from 'react';

import InfoLine from './contacts/InfoLine';
import { INFO_LINE_TYPES } from '../../../utils/constants';

const { NUMBER, SITE, EMAIL } = INFO_LINE_TYPES;

// eslint-disable-next-line react/prefer-stateless-function
class Contacts extends React.Component {
  render() {
    const { phone, web, email } = this.props;

    return (
      <div>
        {phone && <InfoLine type={NUMBER} data={phone} />}
        {web && <InfoLine type={SITE} data={web} />}
        {email && <InfoLine type={EMAIL} data={email} />}
      </div>
    );
  }
}

export default Contacts;
