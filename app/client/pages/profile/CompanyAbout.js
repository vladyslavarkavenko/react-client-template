import React from 'react';
import ContentBody from './components/ContentBody';
import Contacts from './components/Contacts';

// eslint-disable-next-line react/prefer-stateless-function
class CompanyAbout extends React.Component {
  render() {
    const {
      data: { web, email, phone, about }
    } = this.props;

    return (
      <ContentBody
        {...this.props}
        main={[
          {
            title: 'Portrait',
            body: about,
            name: 'about'
          }
        ]}
        sidebar={[
          {
            title: 'Contacts',
            body: <Contacts {...this.props} email={email} phone={phone} web={web} />
          }
        ]}
      />
    );
  }
}

export default CompanyAbout;
