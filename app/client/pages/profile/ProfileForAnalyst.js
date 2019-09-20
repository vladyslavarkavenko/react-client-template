import React from 'react';
import { Switch } from 'react-router-dom';

import WrappedRoute from '../../components/Wrappers/WrappedRoute';
import customLoadable from '../../components/customLoadable';
import routing from '../../utils/routing';
import ContentHeader from './components/ContentHeader';
import ForAnalyst from './HOCs/ForAnalyst';

const Overview = customLoadable({ loader: () => import('./Overview') });
const About = customLoadable({ loader: () => import('./About') });

// eslint-disable-next-line react/prefer-stateless-function
class ProfileForAnalyst extends React.Component {
  render() {
    const {
      data: { avatar, name }
    } = this.props;

    return (
      <div className="content">
        <ContentHeader
          {...this.props}
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
          <WrappedRoute exact path={routing().about} render={() => <About {...this.props} />} />
          <WrappedRoute
            exact
            path={routing().overview}
            render={() => <Overview {...this.props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default ForAnalyst(ProfileForAnalyst);
