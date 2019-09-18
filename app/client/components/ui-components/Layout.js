import React from 'react';
// import RedirectTo from './layout/RedirectTo';

import SvgDecorRT from '../../../../public/assets/svg/decor-rt.svg';
import SvgDecorLB from '../../../../public/assets/svg/decor-lb.svg';

class Layout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <>
        {/*<RedirectTo />*/}

        <SvgDecorRT className="decor decor-rt" />
        {children}
        <SvgDecorLB className="decor decor-lb" />
      </>
    );
  }
}

export default Layout;
