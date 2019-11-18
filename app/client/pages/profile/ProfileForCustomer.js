import React from 'react';
import { Switch } from 'react-router-dom';

import WrappedRoute from '../../components/Wrappers/WrappedRoute';
import customLoadable from '../../components/customLoadable';
import routing from '../../utils/routing';
import EditForm from './components/EditForm';
import ContentHeader from './components/ContentHeader';
import ForUser from './HOCs/ForUser';

const Overview = customLoadable({ loader: () => import('./overview/CustomerOverview') });
const About = customLoadable({ loader: () => import('./about/UserAbout') });

class ProfileForCustomer extends React.Component {
  constructor(props) {
    super(props);

    this.mainSaveChanges = this.mainSaveChanges.bind(this);
    this.mainCancelChanges = this.mainCancelChanges.bind(this);
  }

  mainSaveChanges(e) {
    const { toggleEditMode, saveChanges, cancelChanges } = this.props;

    e.preventDefault();

    saveChanges(['firstName', 'lastName', 'location', 'avatar', 'satisfaction'], () => {
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
    const { isEdit, errors, history, onChange, toggleEditMode, data } = this.props;
    const { avatar, newAvatar, firstName, lastName, location, satisfaction } = data;

    let subTitle;
    switch (satisfaction) {
      case 1:
        subTitle = "I'm unhappy";
        break;
      case 2:
        subTitle = "I'm neutral";
        break;
      case 3:
        subTitle = "I'm satisfied";
        break;
      default:
        break;
    }

    return (
      <>
        <ContentHeader
          displayAvatar
          loc={location}
          isEdit={isEdit}
          history={history}
          onChange={onChange}
          subTitle={subTitle}
          avatar={newAvatar || avatar}
          toggleEditMode={toggleEditMode}
          title={`${firstName} ${lastName}`}
          editForm={
            <EditForm
              onChange={onChange}
              saveChanges={this.mainSaveChanges}
              cancelChanges={this.mainCancelChanges}
              errors={errors}
              satisfaction={satisfaction}
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
                  name: 'location',
                  value: location
                }
              ]}
            />
          }
          navLinks={[
            {
              to: routing().overview,
              title: 'Overview'
            },
            {
              to: routing().about,
              title: 'About'
            }
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

export default ForUser(ProfileForCustomer);
