import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { ROLES } from '../../../utils/constants';
import { pushLogout } from '../../../modules/auth/authActions';
import Logo from './Logo';

import SvgBell from '../../../../../public/assets/svg/bell.svg';
import SvgSearch from '../../../../../public/assets/svg/search.svg';
import SvgQuestion from '../../../../../public/assets/svg/question.svg';
import SvgArrowDown from '../../../../../public/assets/svg/arrow-down.svg';
import routing from '../../../utils/routing';
import authSelectors from '../../../modules/auth/authSelectors';

// TODO: Split all text to local.
// TODO: On click outside of menu close it.

class TopBarWithProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false
    };

    this.logOut = this.logOut.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState((state) => ({
      showMenu: !state.showMenu
    }));
  }

  logOut() {
    const { pushLogout } = this.props;

    pushLogout();
    this.toggleMenu();
  }

  render() {
    const { showMenu } = this.state;
    const { activeRole } = this.props;

    const isCustomer = activeRole === ROLES.CUSTOMER;

    return (
      <div className="nav-bar nav-bar-profile">
        <Logo />
        <div className="search">
          <SvgSearch />
          <input placeholder="Search" />
        </div>
        {isCustomer && (
          <Link to={routing().shareOpinion} className="share-opinion-btn">
            Share your opinion
          </Link>
        )}
        <button>
          <SvgQuestion />
        </button>
        <button>
          <SvgBell />
        </button>
        <div className="avatar">
          <img src="/assets/img/empty-avatar.jpg" alt="Avatar" />
        </div>
        <button className="menu-btn" onClick={this.toggleMenu}>
          <SvgArrowDown />
        </button>
        {showMenu && (
          <ul className="menu">
            <li>
              <Link to={routing().about}>Profile</Link>
            </li>
            <li onClick={this.toggleMenu}>
              <Link to={routing().root}>Settings</Link>
            </li>
            <hr />
            <li onClick={this.logOut}>Log out</li>
          </ul>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activeRole: authSelectors.activeRole(state)
});

const mapDispatchToProps = {
  pushLogout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBarWithProfile);
