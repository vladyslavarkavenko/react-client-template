import React from 'react';

import ContentBody from '../components/ContentBody';
import Contacts from '../components/Contacts';
import ForUser from '../HOCs/ForUser';
import TitleAbout from './TitleAbout';

const UserAbout = ({
  isEdit,
  errors,
  onChange,
  saveChanges,
  cancelChanges,
  data: { email, phone, about }
}) => (
  <ContentBody
    main={[
      {
        name: 'about',
        title: <TitleAbout />,
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
            email={email}
            phone={phone}
          />
        ),
        saveChanges: (cb) => saveChanges(['email', 'phone'], cb),
        cancelChanges: () => cancelChanges(['email', 'phone'])
      }
    ]}
    commonProps={{ isEdit, onChange, errors }}
  />
);

export default ForUser(UserAbout);
