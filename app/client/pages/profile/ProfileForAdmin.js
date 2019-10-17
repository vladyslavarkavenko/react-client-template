import React from 'react';
import { Switch } from 'react-router-dom';
import WrappedRoute from '../../components/Wrappers/WrappedRoute';
import customLoadable from '../../components/customLoadable';

import routing from '../../utils/routing';
import EditForm from './components/EditForm';
import ContentHeader from './components/ContentHeader';
import ForAdmin from './HOCs/ForAdmin';

const OverviewForAdmin = ForAdmin(customLoadable({ loader: () => import('./Overview') }));
const AboutForAdmin = ForAdmin(customLoadable({ loader: () => import('./about/CompanyAbout') }));

// eslint-disable-next-line react/prefer-stateless-function
class ProfileForAdmin extends React.Component {
  render() {
    const {
      data: { avatar, newAvatar, name, title }
    } = this.props;

    return (
      <div className="content">
        <ContentHeader
          {...this.props}
          displayAvatar
          avatar={newAvatar || avatar}
          title={name}
          subTitle="89% of clients are satisfied"
          editForm={
            <EditForm
              {...this.props}
              inputs={[
                {
                  name: 'name',
                  value: name
                },
                {
                  name: 'title',
                  value: title
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
          <WrappedRoute exact path={routing().about} render={() => <AboutForAdmin />} />
          <WrappedRoute exact path={routing().overview} render={() => <OverviewForAdmin />} />
        </Switch>
      </div>
    );
  }
}

export default ForAdmin(ProfileForAdmin);
