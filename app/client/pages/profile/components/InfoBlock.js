import React from 'react';

import EditIcon from './infoBlock/EditIcon';
import CustomTextarea from '../../../components/ui-components/CustomTextarea';

const InfoBlock = ({ title, body, name, isEdit, onChange, errors, className }) => {
  if (isEdit) {
    return (
      <div className={`info-block ${className || ''}`}>
        <EditIcon />
        {typeof title === 'string' ? <h2 className="info-block__title">{title}</h2> : title}
        {typeof body === 'string' ? (
          <CustomTextarea name={name} value={body} onChange={onChange} error={errors[name]} />
        ) : (
          body
        )}
      </div>
    );
  }

  return (
    <div className={`info-block ${className || ''}`}>
      {typeof title === 'string' ? <h2 className="info-block__title">{title}</h2> : title}
      {typeof body === 'string' ? <p>{body || '—'}</p> : body}
    </div>
  );
};

export default InfoBlock;
