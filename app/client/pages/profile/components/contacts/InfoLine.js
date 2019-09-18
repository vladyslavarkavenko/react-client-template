import React from 'react';
import { INFO_LINE_TYPES } from '../../../../constants';

const { NUMBER, EMAIL, SITE } = INFO_LINE_TYPES;

const InfoBlock = ({ type, data }) => {
  let line;
  switch (type) {
    case NUMBER:
      line = <a href={`tel:${data}`}>{data}</a>;
      break;
    case EMAIL:
      line = (
        <a href={data} rel="noopener noreferrer" target="_blank">
          {data}
        </a>
      );
      break;
    case SITE:
      line = <a href={`mailto:${data}`}>{data}</a>;
      break;
    default:
      line = null;
      break;
  }

  return (
    <div className="info-line">
      <p>{type}</p>
      {line}
    </div>
  );
};

export default InfoBlock;
