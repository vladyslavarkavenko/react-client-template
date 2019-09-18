import React from 'react';
import { renderRoutes } from 'react-router-config';

import routing from '../../utils/routing';
import EditForm from './components/EditForm';
import ContentHeader from './components/ContentHeader';

class ProfileForAdmin extends React.Component {
  constructor(props) {
    super(props);

    const { activeRole, rolesPermissions, companies } = props;
    const { avatar, name, title } = companies[rolesPermissions[activeRole]];

    this.state = {
      name,
      title,
      avatar,
      editMode: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
  }

  onChange(e) {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { updateCompany } = this.props;

    updateCompany(this.state);
  }

  toggleEditMode() {
    this.setState((state) => ({
      editMode: !state.editMode
    }));
  }

  render() {
    const {
      route: { routes }
    } = this.props;

    const { avatar, name, title, editMode } = this.state;

    return (
      <div className="content">
        <ContentHeader
          editMode={editMode}
          toggleEditMode={this.toggleEditMode}
          displayAvatar
          avatar={avatar}
          title={name}
          subTitle="89% of clients are satisfied"
          editForm={
            <EditForm
              inputs={[
                {
                  name: 'name',
                  labelText: 'Name',
                  value: name,
                  onChange: this.onChange
                },
                {
                  name: 'title',
                  labelText: 'Title',
                  value: title,
                  onChange: this.onChange
                }
              ]}
              onCancel={this.toggleEditMode}
              onSubmit={this.toggleEditMode}
            />
          }
          navLinks={[
            { to: routing().overview, title: 'Overview' },
            { to: routing().about, title: 'About' }
          ]}
        />
        {renderRoutes(routes, this.props)}
      </div>
    );
  }
}

export default ProfileForAdmin;
