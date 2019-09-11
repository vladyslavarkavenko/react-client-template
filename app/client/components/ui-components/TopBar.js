/* eslint-disable */
import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { signout } from '../../modules/auth';
import { changeLanguage } from '../../modules/language';
import { DEFAULT_LANGUAGE } from '../../config';

import SvgSearch from '../../../../public/assets/svg/search.svg';
import SvgQuestion from '../../../../public/assets/svg/question.svg';
import SvgBell from '../../../../public/assets/svg/bell.svg';
import SvgArrowDown from '../../../../public/assets/svg/arrow-down.svg';

const options = [
  {
    value: 'en',
    label: 'EN',
  },
  {
    value: 'ru',
    label: 'RU',
  },
];

const pathsWithProfile = [''];

// TODO: Add styling for language select.

class TopBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.selectLanguage = this.selectLanguage.bind(this);
  }

  selectLanguage({ value }) {
    const { changeLanguage } = this.props;
    changeLanguage(value);
  }

  toggleMenu() {
    this.setState(state => ({
      showMenu: !state.showMenu,
    }));
  }

  render() {
    const { showMenu } = this.state;
    const { location: { pathname }, signout } = this.props;
    const isProfile = pathsWithProfile.includes(pathname.replace(/\//g, ''));

    return (
      <div className={`nav-bar ${isProfile ? 'nav-bar-profile' : ''}`}>
        <Link to="/" className="nav-bar__logo">
          <img
            src="/assets/img/logo.png"
            alt="cTRU-Logo"
            className="logo"
          />
        </Link>
        {
          isProfile
            ? (
              <>
                <div className="search">
                  <SvgSearch />
                  <input
                    placeholder="Search"
                  />
                </div>
                <button className="share-opinion-btn">
                  Share your opinion
                </button>
                <button>
                  <SvgQuestion />
                </button>
                <button>
                  <SvgBell />
                </button>
                <div className="avatar">
                  <img src="assets/img/empty-avatar.jpg" alt="Avatar" />
                </div>
                <button
                  className="menu-btn"
                  onClick={this.toggleMenu}
                >
                  <SvgArrowDown />
                </button>
                {
                  showMenu
                  && (
                    <ul className="menu">
                      <li>Profile</li>
                      <li>Settings</li>
                      <hr />
                      <li onClick={signout}>
                          Log out
                      </li>
                    </ul>
                  )
                }
              </>
            )
            : (
              <Select
                options={options}
                onChange={this.selectLanguage}
                defaultValue={options.find(({ value }) => value === DEFAULT_LANGUAGE)}
                className="lang-switcher"
                classNamePrefix="lang-switcher"
              />
            )
        }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changeLanguage: lng => dispatch(changeLanguage(lng)),
  signout: () => dispatch(signout()),
});

export default withRouter(connect(null, mapDispatchToProps)(TopBar));
