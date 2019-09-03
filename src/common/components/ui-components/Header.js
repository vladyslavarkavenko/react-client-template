import React from 'react';
import i18n from 'i18next';
import Select from 'react-select';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import '../../assets/images/logo.png';
import { changeLanguage } from '../../modules/language';
import { DEFAULT_LANGUAGE } from '../../config';

const options = [
  { value: 'en', label: 'EN' },
  { value: 'ru', label: 'RU' },
];

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.selectLanguage = this.selectLanguage.bind(this);
  }

  componentDidMount() {
    const { changeLanguage } = this.props;
    changeLanguage(DEFAULT_LANGUAGE);
  }

  selectLanguage({ value }) {
    const { changeLanguage } = this.props;
    changeLanguage(value);
  }

  render() {
    return (
      <div className="header">
        <Link to="/">
          <img src="./logo.png" alt="cTRU-Logo" className="logo" />
        </Link>
        <div>{i18n.t('test_message')}</div>
        <Select
          options={options}
          onChange={this.selectLanguage}
          defaultValue={options.find(({ value }) => value === DEFAULT_LANGUAGE)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lng: state.language.lng,
});

const mapDispatchToProps = dispatch => ({
  changeLanguage: lng => dispatch(changeLanguage(lng)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
