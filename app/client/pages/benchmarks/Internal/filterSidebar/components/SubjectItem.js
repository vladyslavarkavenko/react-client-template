import React from 'react';

import ArrowSvg from '../../../../../../../public/assets/svg/arrow-down.svg';
import CheckboxInput from '../../../../../components/ui-components/Form/CheckboxInput';

export default class SubjectItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.isTopicChecked = this.isTopicChecked.bind(this);
  }

  handleOpen() {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen
    }));
  }

  handleChange(topic) {
    const {
      selectFilter,
      data: { id }
    } = this.props;

    topic.subjectId = id;

    selectFilter(topic);
  }

  isTopicChecked(id) {
    const { selected } = this.props;

    const isChecked = Boolean(selected.find((item) => item.id === id));

    return isChecked;
  }

  render() {
    const { isOpen } = this.state;
    const {
      data: { name, topics },
      selected
    } = this.props;

    const list = topics.map((item) => (
      <li className="topic__item" key={`${item.id}_${name}_k`}>
        <CheckboxInput
          withFill
          name={`${item.id}_${name}`}
          checked={this.isTopicChecked(item.id)}
          labelText={item.name}
          data-id={item.id}
          onChange={isOpen ? () => this.handleChange(item) : null}
        />
      </li>
    ));

    return (
      <li className={`subject__item ${isOpen ? 'active' : ''}`}>
        <button type="button" className="head" onClick={this.handleOpen}>
          <span className="label">{name}</span>

          <div className="controls">
            {selected.length !== 0 && <span className="count">{selected.length}</span>}
            <ArrowSvg />
          </div>
        </button>

        <ul className="topic__list">{isOpen && list}</ul>
      </li>
    );
  }
}
