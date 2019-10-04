import React from 'react';
import Select from 'react-select';
import { ROLES } from '../../utils/constants';

const options = [
  { value: ROLES.MANAGER, label: 'Manager' },
  { value: ROLES.ANALYST, label: 'Analyst' },
  { value: ROLES.ADMIN, label: 'Admin' }
];

/* eslint-disable */
export default class RoleSelect extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(values, { action, option }) {
    const { handleChange, rowId, table } = this.props;
    switch (action) {
      case 'clear':
        handleChange({ id: rowId, table, values: [] });
        break;
      case 'select-option':
        handleChange({ id: rowId, table, values });
        break;
      default:
        handleChange({ id: rowId, table, values });
    }

    console.log(rowId, table, values, action);

    // handleChange({ id: rowId, table, value });
  }

  getOptions(selected) {
    return options.filter((item) => selected.includes(item.value));
  }

  render() {
    const { roles, readOnly } = this.props;

    const values = this.getOptions(roles);

    return (
      <Select
        placeholder="Select role..."
        options={options}
        value={values}
        onChange={this.onChange}
        isDisabled={readOnly}
        // components={{
        //   Control: () => <div />
        // }}
        isMulti
        classNamePrefix="roles-select"
      />
    );
  }
}
