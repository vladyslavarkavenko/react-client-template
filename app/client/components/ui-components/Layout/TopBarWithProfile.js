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

class TopBarWithProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false
    };

    this.menu = React.createRef();
    this.menuBtn = React.createRef();

    this.logOut = this.logOut.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.checkForClickOutside = this.checkForClickOutside.bind(this);
    this.enableCheckForClickOutside = this.enableCheckForClickOutside.bind(this);
    this.disableCheckForClickOutside = this.disableCheckForClickOutside.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.checkForClickOutside);
  }

  checkForClickOutside(e) {
    if (!this.menu.current.contains(e.target) && !this.menuBtn.current.contains(e.target)) {
      this.toggleMenu();
    }
  }

  enableCheckForClickOutside() {
    window.addEventListener('mouseup', this.checkForClickOutside);
  }

  disableCheckForClickOutside() {
    window.removeEventListener('mouseup', this.checkForClickOutside);
  }

  toggleMenu() {
    this.setState(
      (state) => ({ showMenu: !state.showMenu }),
      () => {
        const { showMenu } = this.state;
        showMenu ? this.enableCheckForClickOutside() : this.disableCheckForClickOutside();
      }
    );
  }

  logOut() {
    const { pushLogout } = this.props;

    pushLogout();
    this.toggleMenu();
  }

  render() {
    const { showMenu } = this.state;
    const { activeRole, user } = this.props;

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
        <div className="menu-wrapper" onClick={this.toggleMenu} ref={this.menuBtn}>
          <div className="avatar">
            <img src={user.avatar || '/assets/img/empty-avatar.jpg'} alt="Avatar" />
          </div>
          <button className="menu-btn">
            <SvgArrowDown />
          </button>
        </div>
        {showMenu && (
          <ul className="menu" ref={this.menu}>
            <li onClick={this.toggleMenu}>
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
  user: authSelectors.user(state),
  activeRole: authSelectors.activeRole(state)
});

const mapDispatchToProps = {
  pushLogout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBarWithProfile);
