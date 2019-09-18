import React from 'react';

import InfoBlock from './InfoBlock';

const ContentBody = ({ main, sidebar, editMode }) => (
  <div className="content-body">
    <div className="main">
      {main.map((props) => (
        <InfoBlock key={props.title} editMode={editMode} {...props} />
      ))}
    </div>
    {sidebar && (
      <div className="sidebar">
        {sidebar.map((props) => (
          <InfoBlock key={props.title} editMode={editMode} {...props} />
        ))}
      </div>
    )}
  </div>
);

export default ContentBody;
