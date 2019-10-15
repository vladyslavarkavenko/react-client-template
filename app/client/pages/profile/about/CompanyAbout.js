import React from 'react';
import ContentBody from '../components/ContentBody';
import Contacts from '../components/Contacts';

// eslint-disable-next-line react/prefer-stateless-function
class CompanyAbout extends React.Component {
  render() {
    const {
      isEdit,
      errors,
      onChange,
      data: { web, email, phone, about }
    } = this.props;

    return (
      <ContentBody
        main={[
          {
            name: 'about',
            title: 'Portrait',
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
                web={web}
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

export default CompanyAbout;
