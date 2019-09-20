import React from 'react';
import { INFO_LINE_TYPES } from '../../../../utils/constants';
import TextInput from '../../../../components/ui-components/Form/TextInput';

const { NUMBER, EMAIL, SITE } = INFO_LINE_TYPES;

const InfoLine = ({ type, data, onChange, isEdit, errors }) => {
  if (isEdit) {
    const name = type.toLowerCase();

    return (
      <div className="info-line">
        <p>{type}</p>
        <TextInput value={data} name={name} onChange={onChange} error={errors[name]} />
      </div>
    );
  }

  let line;
  switch (type) {
    case NUMBER:
      line = <a href={`tel:${data}`}>{data}</a>;
      break;
    case SITE:
      line = (
        <a href={data} rel="noopener noreferrer" target="_blank">
          {data}
        </a>
      );
      break;
    case EMAIL:
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

export default InfoLine;
