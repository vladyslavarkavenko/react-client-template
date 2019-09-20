import React from 'react';

import SvgDecorRT from '../../../../../public/assets/svg/decor-rt.svg';
import SvgDecorLB from '../../../../../public/assets/svg/decor-lb.svg';

export default function AuthBackground({ children }) {
  return (
    <>
      <SvgDecorRT className="decor decor-rt" />
      {children}
      <SvgDecorLB className="decor decor-lb" />
    </>
  );
}
