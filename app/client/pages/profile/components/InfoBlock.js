import React from 'react';

const InfoBlock = ({ title, body }) => (
  <div className="info-block">
    {title && <h1>{title}</h1>}
    {typeof body === 'string' ? <p>{body}</p> : body}
  </div>
);

export default InfoBlock;
