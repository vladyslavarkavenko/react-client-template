import React from 'react';

import ContentBody from '../components/ContentBody';
import Contacts from '../components/Contacts';
import ForCompany from '../HOCs/ForCompany';

const CompanyAbout = ({
  isEdit,
  errors,
  onChange,
  saveChanges,
  cancelChanges,
  data: { web, email, phone, about }
}) => (
  <ContentBody
    main={[
      {
        name: 'about',
        title: 'Portrait',
        body: about,
        saveChanges: (cb) => saveChanges(['about'], cb),
        cancelChanges: () => cancelChanges(['about'])
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
        ),
        saveChanges: (cb) => saveChanges(['email', 'phone', 'web'], cb),
        cancelChanges: () => cancelChanges(['email', 'phone', 'web'])
      }
    ]}
    commonProps={{ isEdit, onChange, errors }}
  />
);

export default ForCompany(CompanyAbout);
