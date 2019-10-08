import React from 'react';

import InfoBlock from './InfoBlock';

const ContentBody = ({ main, sidebar, ...rest }) => (
  <div className="content-body">
    <div className="main">
      {main.map((props) => (
        <InfoBlock key={props.title || Math.random()} {...rest} {...props} />
      ))}
    </div>
    {sidebar && (
      <div className="sidebar">
        {sidebar.map((props) => (
          <InfoBlock key={props.title || Math.random()} {...rest} {...props} />
        ))}
      </div>
    )}
  </div>
);

export default ContentBody;
