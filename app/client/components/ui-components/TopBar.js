import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { changeLanguage } from '../../modules/language';
import { DEFAULT_LANGUAGE } from '../../config';

const options = [
  { value: 'en', label: 'EN' },
  { value: 'ru', label: 'RU' },
];

// TODO: Add styling for language select.

class TopBar extends React.Component {
  constructor(props) {
    super(props);

    this.selectLanguage = this.selectLanguage.bind(this);
  }

  selectLanguage({ value }) {
    const { changeLanguage } = this.props;
    changeLanguage(value);
  }

  render() {
    return (
      <div className="nav-bar">
        <Link to="/" className="nav-bar__logo">
          <img
            src="/assets/img/logo.png"
            alt="cTRU-Logo"
            className="logo"
          />
        </Link>
        <Select
          options={options}
          onChange={this.selectLanguage}
          defaultValue={options.find(({ value }) => value === DEFAULT_LANGUAGE)}
          className="lang-switcher"
          classNamePrefix="lang-switcher"
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changeLanguage: lng => dispatch(changeLanguage(lng)),
});

export default connect(null, mapDispatchToProps)(TopBar);
