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
  multipleRoles,
  onlyDropEdit
}) {
  const { id, firstName, lastName, email, isChecked, roles, status, _changes = {} } = data;

  const withErrors = Object.keys(errors).length;

  // if you want to control input in realtime use value and onChange

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
      {onlyDropEdit ? (
        <>
          <div className="item">{firstName}</div>
          <div className="item">{lastName}</div>
          <div className="item">{email}</div>
        </>
      ) : (
        <>
          <div className={`item ${errors.firstName ? 'error' : ''}`}>
            <input
              type="text"
              defaultValue={_changes.firstName || firstName}
              data-id={id}
              data-field="firstName"
              onBlur={handleEdit}
            />
            <ErrorCircle field="firstName" errors={errors} />
          </div>
          <div className={`item ${errors.lastName ? 'error' : ''}`}>
            <input
              type="text"
              defaultValue={_changes.lastName || lastName}
              data-id={id}
              data-field="lastName"
              onBlur={handleEdit}
            />
            <ErrorCircle field="lastName" errors={errors} />
          </div>
          <div className={`item ${errors.email ? 'error' : ''}`}>
            <input
              type="text"
              defaultValue={_changes.email || email}
              data-id={id}
              data-field="email"
              onBlur={handleEdit}
            />
            <ErrorCircle field="email" errors={errors} />
          </div>
        </>
      )}

      <div className={`item item-x2 drop ${errors.role ? 'error' : ''}`}>
        <RoleSelect
          handleChange={handleChangeRole}
          rowId={id}
          table={table}
          roles={roles}
          tempRoles={_changes.roles}
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
