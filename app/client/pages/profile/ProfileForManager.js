import React from 'react';
import { Switch } from 'react-router-dom';
import WrappedRoute from '../../components/Wrappers/WrappedRoute';
import customLoadable from '../../components/customLoadable';

import routing from '../../utils/routing';
import EditForm from './components/EditForm';
import ContentHeader from './components/ContentHeader';
import ForUser from './HOCs/ForUser';

const Overview = customLoadable({ loader: () => import('./Overview') });
const About = customLoadable({ loader: () => import('./about/UserAbout') });

// eslint-disable-next-line react/prefer-stateless-function
class ProfileForManager extends React.Component {
  constructor(props) {
    super(props);

    this.mainSaveChanges = this.mainSaveChanges.bind(this);
    this.mainCancelChanges = this.mainCancelChanges.bind(this);
  }

  mainSaveChanges(e) {
    const { toggleEditMode, saveChanges, cancelChanges } = this.props;

    e.preventDefault();

    saveChanges(['firstName', 'lastName', 'location', 'title', 'avatar'], () => {
      toggleEditMode();
      cancelChanges(['about', 'email', 'phone']);
    });
  }

  mainCancelChanges(e) {
    const { toggleEditMode, cancelChanges } = this.props;

    e.preventDefault();

    toggleEditMode();
    cancelChanges();
  }

  render() {
    const {
      isEdit,
      errors,
      history,
      onChange,
      toggleEditMode,
      data: { avatar, newAvatar, firstName, lastName, location, title }
    } = this.props;

    return (
      <>
        <ContentHeader
          displayAvatar
          loc={location}
          isEdit={isEdit}
          history={history}
          onChange={onChange}
          subTitle={title}
          avatar={newAvatar || avatar}
          toggleEditMode={toggleEditMode}
          title={`${firstName} ${lastName}`}
          editForm={
            <EditForm
              onChange={onChange}
              saveChanges={this.mainSaveChanges}
              cancelChanges={this.mainCancelChanges}
              errors={errors}
              inputs={[
                {
                  labelText: 'First name',
                  name: 'firstName',
                  value: firstName,
                  className: 'mr-2 d-inline-block'
                },
                {
                  labelText: 'Last name',
                  name: 'lastName',
                  value: lastName,
                  className: 'd-inline-block'
                },
                {
                  labelText: 'Title (optional)',
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
          <WrappedRoute exact path={routing().about} render={() => <About />} />
          <WrappedRoute exact path={routing().overview} render={() => <Overview />} />
        </Switch>
      </>
    );
  }
}

export default ForUser(ProfileForManager);
