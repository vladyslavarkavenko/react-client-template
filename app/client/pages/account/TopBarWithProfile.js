import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { ROLES } from '../../constants';
import { signout } from '../../modules/auth';
import Logo from '../../components/ui-components/Logo';

import SvgBell from '../../../../public/assets/svg/bell.svg';
import SvgSearch from '../../../../public/assets/svg/search.svg';
import SvgQuestion from '../../../../public/assets/svg/question.svg';
import SvgArrowDown from '../../../../public/assets/svg/arrow-down.svg';

// TODO: Split all text to local.
// TODO: On click outside of menu close it.

class TopBarWithProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
    };

    this.logOut = this.logOut.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState(state => ({
      showMenu: !state.showMenu,
    }));
  }

  logOut() {
    const { signout } = this.props;

    signout();
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
          <input
            placeholder="Search"
          />
        </div>
        {
          isCustomer
          && (
            <Link to="/share-opinion" className="share-opinion-btn">
              Share your opinion
            </Link>
          )
        }
        <button>
          <SvgQuestion />
        </button>
        <button>
          <SvgBell />
        </button>
        <div className="avatar">
          <img
            src="assets/img/empty-avatar.jpg"
            alt="Avatar"
          />
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
              <li>
                <Link to="/profile">
                  Profile
                </Link>
              </li>
              <li onClick={this.toggleMenu}>
                <Link to="/">
                  Settings
                </Link>
              </li>
              <hr />
              <li onClick={this.logOut}>
                Log out
              </li>
            </ul>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeRole: state.auth.activeRole,
});

const mapDispatchToProps = dispatch => ({
  signout: () => dispatch(signout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopBarWithProfile);
