import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import { getUser, setTokens } from '../../modules/auth';
import { clearRedirect } from '../../modules/redirect';

import SvgDecorRT from '../../../../public/assets/svg/decor-rt.svg';
import SvgDecorLB from '../../../../public/assets/svg/decor-lb.svg';

const pathsWithDecor = ['forgot-password', 'registration', 'login'];

// TODO: Check if we need polyfill for includes.
// TODO: Split logic for decor, app init and redirect in different files.

const RedirectTo = ({ to }) => (to ? <Redirect to={to} /> : null);

class Layout extends React.Component {
  componentDidMount() {
    const { getUser } = this.props;

    setTokens({
      access: localStorage.getItem('access_token'),
      refresh: localStorage.getItem('refresh_token'),
    });
    getUser();
  }

  render() {
    const {
      children,
      redirectTo,
      location: { pathname },
    } = this.props;

    const isWithDecor = pathsWithDecor.includes(pathname.replace(/\//g, ''));
    return (
      <>
        <RedirectTo to={redirectTo} />
        {
            isWithDecor
            && (
              <>
                <SvgDecorRT className="decor decor-rt" />
                <SvgDecorLB className="decor decor-lb" />
              </>
            )
          }
        {children}
      </>
    );
  }
}

const mapStateToProps = state => ({
  redirectTo: state.redirect,
});

export default withRouter(connect(mapStateToProps, { getUser, clearRedirect })(Layout));
