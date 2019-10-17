import React from 'react';
import ContentBody from '../components/ContentBody';
import Contacts from '../components/Contacts';

// eslint-disable-next-line react/prefer-stateless-function
class UserAbout extends React.Component {
  render() {
    const {
      isEdit,
      errors,
      onChange,
      data: { email, phone, about }
    } = this.props;

    return (
      <ContentBody
        main={[
          {
            name: 'about',
            title: 'Biography',
            body: about
          }
        ]}
        sidebar={[
          {
            title: 'Contacts',
            body: (isBlockEditing) => (
              <Contacts
                isEdit={isBlockEditing}
                onChange={onChange}
                errors={errors}
                email={email}
                phone={phone}
              />
            )
          }
        ]}
        commonProps={{ isEdit, onChange, errors }}
      />
    );
  }
}

export default UserAbout;
