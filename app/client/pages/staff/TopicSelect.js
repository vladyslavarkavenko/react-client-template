import React from 'react';
import Select, { components } from 'react-select';
import { connect } from 'react-redux';
import staffSelectors from '../../modules/staff/staffSelectors';
import { changeTableTopic } from '../../modules/staff/staffActions';
import Button from '../../components/ui-components/Form/Button';

/* eslint-disable */

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};
const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center'
};

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

  console.log();

  return (
    <div className="roles-select__group-head" onClick={() => onChange(groupOptions, action)}>
      <components.GroupHeading {...props} />
      <div className="remain">{remainItemsCount}</div>
    </div>
  );
};

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
    console.log(values);
    // console.log(values, action, option);
    const { handleChange, rowId, table } = this.props;

    handleChange({ id: rowId, table, values, action });
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
        return { label: topic.name, value: topic.id, group: subject.name };
      });

      return {
        label: subject.name,
        options: topics
      };
    });

    return options;
  }

  handleExpand() {
    this.setState((prevState) => ({
      isExpanded: !prevState.isExpanded
    }));
  }

  render() {
    const { isExpanded } = this.state;
    const { subjects, selected } = this.props;

    const options = this.createOptions(subjects);

    // <div onClick={() => args[0].setValue(args[0].options)}>
    // </div>;
    //   {/*<div onClick={() => this.onChange(group.options)} style={groupStyles}>*/}
    //   {/*  <span>{group.label}</span>*/}
    //     // <span style={groupBadgeStyles}>{group.options.length}</span>
    //   // </div>
    // // );

    return (
      <div className="role-select-wrapper">
        <div className="select">
          <Select
            placeholder="Select topics..."
            options={options}
            value={selected}
            onChange={this.onChange}
            components={{
              GroupHeading
            }}
            // formatGroupLabel={formatGroupLabel}
            isMulti
            isDisabled={!isExpanded}
            className={isExpanded ? '' : 'collapsed'}
            classNamePrefix="roles-select"
          />
        </div>

        <Button onClick={this.handleExpand} className="role-expand-btn">
          {isExpanded ? 'Close' : `Edit ${selected.length ? `${selected.length} items` : ''}`}
        </Button>
      </div>
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
