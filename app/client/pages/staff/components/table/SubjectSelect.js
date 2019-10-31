import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

import staffSelectors from '../../../../modules/staff/staffSelectors';
import { changeTableSubject } from '../../../../modules/staff/staffActions';

function createOptions(subjects = []) {
  return subjects.map(({ name, id }) => ({ label: name, value: id, id }));
}

class SubjectSelect extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(values, action) {
    const { handleChange, rowId, table } = this.props;

    const normalizedValues = values ? values.map(({ label, id }) => ({ name: label, id })) : [];

    handleChange({ id: rowId, table, values: normalizedValues, action });
  }

  render() {
    const { subjects, selected, readOnly } = this.props;

    const options = createOptions(subjects);
    const values = selected ? createOptions(selected) : null;

    return (
      <div className="topic-select-wrapper">
        <Select
          placeholder={readOnly ? 'None' : 'Select subjects...'}
          options={options}
          value={values}
          onChange={this.onChange}
          closeMenuOnSelect={false}
          isMulti
          isDisabled={readOnly}
          classNamePrefix="topic-select"
          menuPosition="fixed"
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  selected: staffSelectors.getSubjectsByRowId(state, { id: props.rowId, table: props.table }),
  subjects: staffSelectors.subjectList(state)
});

const mapDispatchToProps = {
  handleChange: changeTableSubject
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectSelect);
