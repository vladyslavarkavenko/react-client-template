import React from 'react';
import { Switch } from 'react-router-dom';
import WrappedRoute from '../../components/Wrappers/WrappedRoute';
import customLoadable from '../../components/customLoadable';

import routing from '../../utils/routing';
import EditForm from './components/EditForm';
import ContentHeader from './components/ContentHeader';
import ForCompany from './HOCs/ForCompany';

const Overview = customLoadable({ loader: () => import('./Overview') });
const About = customLoadable({ loader: () => import('./about/CompanyAbout') });

class ProfileForAdmin extends React.Component {
  constructor(props) {
    super(props);

    this.mainSaveChanges = this.mainSaveChanges.bind(this);
    this.mainCancelChanges = this.mainCancelChanges.bind(this);
  }

  mainSaveChanges(e) {
    const { toggleEditMode, saveChanges, cancelChanges } = this.props;

    e.preventDefault();

    saveChanges(['name', 'title', 'avatar'], () => {
      toggleEditMode();
      cancelChanges(['about', 'email', 'phone', 'web']);
    });
  }

  mainCancelChanges(e) {
    const { toggleEditMode, cancelChanges } = this.props;

    e.preventDefault();

    cancelChanges();
    toggleEditMode();
  }

  render() {
    const {
      isEdit,
      errors,
      history,
      onChange,
      toggleEditMode,
      data: { avatar, newAvatar, name, title }
    } = this.props;

    return (
      <>
        <ContentHeader
          isEdit={isEdit}
          history={history}
          onChange={onChange}
          toggleEditMode={toggleEditMode}
          displayAvatar
          avatar={newAvatar || avatar}
          title={name}
          subTitle="89% of clients are satisfied"
          editForm={
            <EditForm
              onChange={onChange}
              saveChanges={this.mainSaveChanges}
              cancelChanges={this.mainCancelChanges}
              errors={errors}
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
          <WrappedRoute exact path={routing().about} render={() => <About />} />
          <WrappedRoute exact path={routing().overview} render={() => <Overview />} />
        </Switch>
      </>
    );
  }
}

export default ForCompany(ProfileForAdmin);
