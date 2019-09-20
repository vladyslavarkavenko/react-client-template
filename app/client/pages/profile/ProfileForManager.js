import React from 'react';
import { Switch } from 'react-router-dom';
import WrappedRoute from '../../components/Wrappers/WrappedRoute';
import customLoadable from '../../components/customLoadable';

import routing from '../../utils/routing';
import EditForm from './components/EditForm';
import ContentHeader from './components/ContentHeader';
import ForManager from './HOCs/ForManager';

const Overview = customLoadable({ loader: () => import('./Overview') });
const AboutForManager = ForManager(customLoadable({ loader: () => import('./UserAbout') }));

// eslint-disable-next-line react/prefer-stateless-function
class ProfileForManager extends React.Component {
  render() {
    const {
      data: { avatar, newAvatar, firstName, lastName, location, title }
    } = this.props;

    return (
      <div className="content">
        <ContentHeader
          {...this.props}
          displayAvatar
          avatar={newAvatar || avatar}
          title={`${firstName} ${lastName}`}
          subTitle="I'm satisfied"
          loc={location}
          editForm={
            <EditForm
              {...this.props}
              inputs={[
                {
                  labelText: 'First name',
                  name: 'firstName',
                  value: firstName
                },
                {
                  labelText: 'Last name',
                  name: 'lastName',
                  value: lastName
                },
                {
                  name: 'title',
                  value: title
                },
                {
                  name: 'location',
                  value: location
                }
              ]}
            />
          }
          navLinks={[
            { to: routing().overview, title: 'Overview' },
            { to: routing().about, title: 'About' }
          ]}
        />
        <Switch>
          <WrappedRoute exact path={routing().about} render={() => <AboutForManager />} />
          <WrappedRoute exact path={routing().overview} render={() => <Overview />} />
        </Switch>
      </div>
    );
  }
}

export default ForManager(ProfileForManager);
