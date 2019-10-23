import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

import { changeTableManager } from '../../../../modules/clients/clientsActions';
import clientsSelectors from '../../../../modules/clients/clientsSelectors';

class ManagerSelect extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    const { handleChange, rowId, table } = this.props;

    handleChange({ id: rowId, table, value });
  }

  render() {
    const { managers, manager, readOnly } = this.props;

    return (
      <div className="role-select-wrapper">
        <Select
          placeholder={readOnly ? 'None' : 'Select Manager...'}
          menuPosition="fixed"
          options={managers}
          value={manager}
          onChange={this.onChange}
          isDisabled={readOnly}
          // components={{
          //   Control: () => <div />
          // }}
          classNamePrefix="role-select"
        />
      </div>
    );
  }
}

const mapStateToProps = (state, { rowId, table }) => ({
  managers: clientsSelectors.getManagers(state),
  manager: clientsSelectors.getManagerByRowId(state, { id: rowId, table })
});

const mapDispatchToProps = {
  handleChange: changeTableManager
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerSelect);
