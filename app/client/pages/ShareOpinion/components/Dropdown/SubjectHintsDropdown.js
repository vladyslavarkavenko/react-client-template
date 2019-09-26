import React from 'react';

export default class SubjectHintsDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true
    };

    this.showDropdown = this.showDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
  }

  showDropdown(e) {
    e.preventDefault();
    this.setState(
      {
        show: true
      },
      () => document.addEventListener('click', this.closeDropdown)
    );
  }

  closeDropdown(e) {
    e.preventDefault();
    try {
      this.setState({
        show: false
      });
    } catch (err) {}

    document.removeEventListener('click', this.closeDropdown);
  }

  render() {
    const { show } = this.state;
    const { hints, disabled, save } = this.props;

    const items = hints.map((item) => (
      <li key={item.name}>
        <button className="drop-item" onClick={() => save(item)}>
          {item.name}
        </button>
      </li>
    ));

    return (
      <div className="m-drop">
        {show && !disabled && hints.length !== 0 && <ul className="drop-list">{items}</ul>}
      </div>
    );
  }
}
