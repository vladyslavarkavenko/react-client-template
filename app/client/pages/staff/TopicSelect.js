import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import staffSelectors from '../../modules/staff/staffSelectors';
import { changeTableTopic } from '../../modules/staff/staffActions';

/* eslint-disable */
class TopicSelect extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(values, { action, option }) {
    console.log(values, action, option);
    const { handleChange, rowId, table } = this.props;
    handleChange({ id: rowId, table, values });
    // const { handleChange, rowId, table } = this.props;
    // switch (action) {
    //   case 'clear':
    //     handleChange({ id: rowId, table, values: [] });
    //     break;
    //   case 'select-option':
    //     handleChange({ id: rowId, table, values });
    //     break;
    //   default:
    //     handleChange({ id: rowId, table, values });
    // }
    //
    // console.log(rowId, table, values, action);
    //
    // // handleChange({ id: rowId, table, value });
  }

  createOptions(subjects) {
    const options = subjects.map((subject) => {
      const topics = subject.topics.map((topic) => {
        return { label: topic.name, value: topic.id, subjectId: subject.id };
      });

      return {
        label: subject.name,
        options: topics
      };
    });

    return options;
  }

  render() {
    const { subjects, selected } = this.props;

    const options = this.createOptions(subjects);

    return (
      <Select
        options={options}
        value={selected}
        onChange={this.onChange}
        isMulti
        classNamePrefix="roles-select"
      />
    );
  }
}

const mapStateToProps = (state, props) => ({
  selected: staffSelectors.getTopicsByRowId(state, props.rowId),
  subjects: staffSelectors.subjectList(state)
});

const mapDispatchToProps = {
  handleChange: changeTableTopic
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicSelect);
