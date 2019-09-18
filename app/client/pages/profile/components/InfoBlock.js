import React from 'react';

import EditIcon from './infoBlock/EditIcon';

// TODO: Styling for editable fields.
// TODO: Think how to toggle edit mode for custom body component.
// TODO: Make better styling for cancel button.
// TODO: Add validation and good-looking errors. (60/256)
const InfoBlock = ({ title, body, editMode }) => {
  if (editMode) {
    return (
      <div className="info-block">
        <EditIcon />
        {title && <h1>{title}</h1>}
        {typeof body === 'string' ? <textarea value={body} /> : body}
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
