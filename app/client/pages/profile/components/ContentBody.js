import React from 'react';

import InfoBlock from './InfoBlock';

const keyFromProps = (props) => {
  const { key, title } = props;

  if (key) {
    return key;
  }
  if (typeof title === 'string') {
    return title;
  }
  return Math.random();
};

const ContentBody = ({ main, sidebar, commonProps }) => (
  <div className="content-body">
    <div className="main">
      {main.map((props) => (
        <InfoBlock key={keyFromProps(props)} {...props} {...commonProps} />
      ))}
    </div>
    {sidebar && (
      <div className="sidebar">
        {sidebar.map((props) => (
          <InfoBlock key={keyFromProps(props)} {...props} {...commonProps} />
        ))}
      </div>
    )}
  </div>
);

export default ContentBody;
