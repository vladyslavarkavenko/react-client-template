import React from 'react';
import TopBar from '../ui-components/TopBar';
import Layout from '../ui-components/Layout';
import {Route} from 'react-router-dom';
import TopBarWithProfile from '../../pages/account/TopBarWithProfile';
import LeftBar from '../../pages/account/LeftBar';

// TODO: Make different other pages
export default function WrappedRoute(props) {
  return (
    <>
      <Route {...props}/>
    </>
  )
}
