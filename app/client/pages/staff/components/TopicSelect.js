import React from 'react';
import Select, { components } from 'react-select';
import { connect } from 'react-redux';
import staffSelectors from '../../../modules/staff/staffSelectors';
import { changeTableTopic } from '../../../modules/staff/staffActions';
import Button from '../../../components/ui-components/Form/Button';

const GroupHeading = (props) => {
  const action = 'select-group';
  const { children: label, selectProps } = props;
  const { options, value, onChange } = selectProps;
  const groupOptions = options.find((subject) => subject.label === label).options;

  const valuesId = value.map((item) => item.value);
  const remainItemsCount = groupOptions.reduce(
    (acc, option) => (valuesId.indexOf(option.value) === -1 ? acc + 1 : acc),
    0
  );

  return (
    <div className="roles-select__group-head" onClick={() => onChange(groupOptions, action)}>
      <components.GroupHeading {...props} />
      <div className="remain">{remainItemsCount}</div>
    </div>
  );
};

function createOptions(subjects) {
  const options = subjects.map((subject) => {
    const topics = subject.topics.map((topic) => {
      return { label: topic.name, value: topic.id, group: subject.name };
    });

    return {
      label: subject.name,
      options: topics
    };
  });

  return options;
}

class TopicSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false
    };

    this.onChange = this.onChange.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
  }

  onChange(values, action) {
    const { handleChange, rowId, table } = this.props;

    handleChange({ id: rowId, table, values, action });
  }

  handleExpand() {
    this.setState((prevState) => ({
      isExpanded: !prevState.isExpanded
    }));
  }

  render() {
    const { isExpanded } = this.state;
    const { subjects, selected, readOnly } = this.props;

    const options = createOptions(subjects);

    return (
      <div className="topic-select-wrapper">
        <div className="select">
          <Select
            placeholder={readOnly ? 'None' : 'Select topics...'}
            options={options}
            value={selected}
            onChange={this.onChange}
            components={{
              GroupHeading
            }}
            isMulti
            isDisabled={!isExpanded || readOnly}
            className={isExpanded ? '' : 'collapsed'}
            classNamePrefix="topic-select"
          />
        </div>

        <Button onClick={this.handleExpand} className="topic-expand-btn">
          {isExpanded ? 'Close' : `Show ${selected.length ? `${selected.length} items` : ''}`}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  selected: staffSelectors.getTopicsByRowId(state, { id: props.rowId, table: props.table }),
  subjects: staffSelectors.subjectList(state)
});

const mapDispatchToProps = {
  handleChange: changeTableTopic
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicSelect);
