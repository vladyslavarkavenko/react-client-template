import React from 'react';
import ContentBody from './components/ContentBody';
import Contacts from './components/Contacts';

// eslint-disable-next-line react/prefer-stateless-function
class About extends React.Component {
  render() {
    const { activeRole, rolesPermissions, companies, editMode } = this.props;

    const { web, email, phone, about } = companies[rolesPermissions[activeRole]];

    return (
      <ContentBody
        editMode={editMode}
        main={[
          {
            title: 'Portrait',
            body: about
          }
        ]}
        sidebar={[
          {
            title: 'Contacts',
            body: <Contacts email={email} phone={phone} web={web} />
          }
        ]}
      />
    );
  }
}

export default About;
