import React from 'react';
import ContentBody from './components/ContentBody';
import Contacts from './components/Contacts';

// eslint-disable-next-line react/prefer-stateless-function
class UserAbout extends React.Component {
  render() {
    const {
      data: { email, phone, about }
    } = this.props;

    return (
      <ContentBody
        {...this.props}
        main={[
          {
            title: 'Biography',
            body: about,
            name: 'about'
          }
        ]}
        sidebar={[
          {
            title: 'Contacts',
            body: <Contacts {...this.props} email={email} phone={phone} />
          }
        ]}
      />
    );
  }
}

export default UserAbout;
