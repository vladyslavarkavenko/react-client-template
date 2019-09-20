import React from 'react';

import EditIcon from './infoBlock/EditIcon';
import CustomTextarea from '../../../components/ui-components/CustomTextarea';

// TODO: Styling for editable fields.
// TODO: Think how to toggle edit mode for custom body component.
// TODO: Make better styling for cancel button.
// TODO: Add errors.
const InfoBlock = ({ title, body, name, isEdit, onChange, errors }) => {
  if (isEdit) {
    return (
      <div className="info-block">
        <EditIcon />
        {title && <h1>{title}</h1>}
        {typeof body === 'string' ? (
          <CustomTextarea name={name} value={body} onChange={onChange} error={errors[name]} />
        ) : (
          body
        )}
      </div>
    );
  }

  return (
    <div className="info-block">
      {title && <h1>{title}</h1>}
      {typeof body === 'string' ? <p>{body}</p> : body}
    </div>
  );
};

export default InfoBlock;
