import React from 'react';
import { Switch } from 'react-router-dom';

import routing from '../../utils/routing';
import ForCompany from './HOCs/ForCompany';
import ContentHeader from './components/ContentHeader';
import customLoadable from '../../components/customLoadable';
import WrappedRoute from '../../components/Wrappers/WrappedRoute';

const Overview = customLoadable({ loader: () => import('./Overview') });
const About = customLoadable({ loader: () => import('./about/CompanyAbout') });

// eslint-disable-next-line react/prefer-stateless-function
class ProfileForAnalyst extends React.Component {
  render() {
    const {
      data: { avatar, name }
    } = this.props;

    return (
      <>
        <ContentHeader
          displayAvatar
          avatar={avatar}
          title={name}
          subTitle="89% of clients are satisfied"
          navLinks={[
            { to: routing().overview, title: 'Overview' },
            { to: routing().about, title: 'About' }
          ]}
        />
        <Switch>
          <WrappedRoute exact path={routing().about} render={() => <About />} />
          <WrappedRoute exact path={routing().overview} render={() => <Overview />} />
        </Switch>
      </>
    );
  }
}

export default ForCompany(ProfileForAnalyst);
