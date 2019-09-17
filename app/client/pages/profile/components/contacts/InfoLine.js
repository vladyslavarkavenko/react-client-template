import React from 'react';
import { INFO_LINE_TYPES } from '../../../../constants';

const { NUMBER, EMAIL, SITE } = INFO_LINE_TYPES;

const InfoBlock = ({ type, data }) => {
  let Line;
  switch (type) {
    case NUMBER:
      Line = (
        <a href={`tel:${data}`}>
          {data}
        </a>
      );
      break;
    case EMAIL:
      Line = (
        <a href={data} rel="noopener noreferrer" target="_blank">
          {data}
        </a>
      );
      break;
    case SITE:
      Line = (
        <a href={`mailto:${data}`}>
          {data}
        </a>
      );
      break;
    default:
      Line = null;
      break;
  }

  return (
    <div className="info-line">
      <p>{type}</p>
      <Line />
    </div>
  );
};

export default InfoBlock;
