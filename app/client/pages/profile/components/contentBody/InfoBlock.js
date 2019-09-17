import React from 'react';

const InfoBlock = ({ title, body, render }) => (
  <div className="info-block">
    {title && <h1>{title}</h1>}
    {body && <p>{body}</p>}
    {render && render()}
  </div>
);

export default InfoBlock;
