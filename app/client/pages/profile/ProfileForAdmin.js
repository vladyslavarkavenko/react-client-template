import React from 'react';

import Contacts from './components/Contacts';
import EditButton from './components/EditButton';
import ContentBody from './components/ContentBody';
import ContentHeader from './components/ContentHeader';

// eslint-disable-next-line react/prefer-stateless-function
class ProfileForAdmin extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    const { activeRole, rolesPermissions, companies } = this.props;

    console.log(activeRole, rolesPermissions, companies);
    const { email, avatar, phone, web, about, name } = companies[rolesPermissions[activeRole]];

    return (
      <div className="content">
        <ContentHeader
          displayAvatar
          avatar={avatar}
          title={name}
          subTitle="89% of clients are satisfied"
          renderButtons={EditButton}
          navLinks={[{ to: '/', title: 'Overview' }, { to: '/', title: 'About' }]}
        />
        <ContentBody
          structure={{
            main: [
              {
                title: 'Portrait',
                body: about
              }
            ],
            sidebar: [
              {
                title: 'Contacts',
                bodyComponent: () => <Contacts email={email} phone={phone} web={web} />
              }
            ]
          }}
        />
      </div>
    );
  }
}

export default ProfileForAdmin;
