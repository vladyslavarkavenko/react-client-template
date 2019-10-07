/* eslint-disable */
import React from 'react';
import CheckboxInput from '../../../components/ui-components/Form/CheckboxInput';
import ErrorSvg from '../../../../../public/assets/svg/exclamation-circle.svg';
import RoleSelect from './RoleSelect';
import TopicSelect from './TopicSelect';
import Notification from '../../../utils/notifications';

const handleNotify = (field, errors) => Notification.info(errors[field]);

const ErrorCircle = ({ field, errors }) => {
  if (errors[field]) {
    return (
      <span className="error-notify" onClick={() => handleNotify(field, errors)}>
        <ErrorSvg />
      </span>
    );
  }

  return null;
};

export default function InputRow({
  table,
  errors = {},
  data,
  handleEdit,
  handleChangeRole,
  multipleRoles
}) {
  const { id, firstName, lastName, email, isChecked, roles, status } = data;

  const withErrors = Object.keys(errors).length;

  return (
    <li className={`row ${withErrors ? 'withErrors' : ''}`}>
      <div className={`item item-check ${errors.firstName ? 'error' : ''}`}>
        <CheckboxInput
          name={id}
          withFill
          onlyCheck
          onChange={handleEdit}
          data-id={id}
          checked={isChecked}
          data-field="isChecked"
        />
      </div>
      <div className={`item ${errors.firstName ? 'error' : ''}`}>
        <input
          type="text"
          defaultValue={firstName}
          data-id={id}
          data-field="firstName"
          onBlur={handleEdit}
        />
        <ErrorCircle field="firstName" errors={errors} />
      </div>
      <div className={`item ${errors.lastName ? 'error' : ''}`}>
        <input
          type="text"
          defaultValue={lastName}
          data-id={id}
          data-field="lastName"
          onBlur={handleEdit}
        />
        <ErrorCircle field="lastName" errors={errors} />
      </div>
      <div className={`item ${errors.email ? 'error' : ''}`}>
        <input
          type="text"
          defaultValue={email}
          data-id={id}
          data-field="email"
          onBlur={handleEdit}
        />
        <ErrorCircle field="email" errors={errors} />
      </div>
      <div className={`item item-x2 drop ${errors.role ? 'error' : ''}`}>
        <RoleSelect
          handleChange={handleChangeRole}
          rowId={id}
          table={table}
          roles={roles}
          multipleRoles={multipleRoles}
        />
        <ErrorCircle field="role" errors={errors} />
      </div>
      <div className="item item-x3 drop">
        <TopicSelect rowId={id} table={table} />
      </div>

      <div className="item">{status || '-'}</div>
    </li>
  );
}
