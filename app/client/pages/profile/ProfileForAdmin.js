import React from 'react';
import { Switch } from 'react-router-dom';
import WrappedRoute from '../../components/Wrappers/WrappedRoute';
import customLoadable from '../../components/customLoadable';

import routing from '../../utils/routing';
import EditForm from './components/EditForm';
import ContentHeader from './components/ContentHeader';

const Overview = customLoadable({ loader: () => import('./Overview') });
const About = customLoadable({ loader: () => import('./About') });

class ProfileForAdmin extends React.Component {
  constructor(props) {
    super(props);

    const { activeRole, rolesPermissions, companies } = props;
    const { avatar, name, title } = companies[rolesPermissions[activeRole]];

    this.state = {
      name: name || '', // If null default values doesn't work.
      title: title || '',
      avatar: avatar || '',
      newAvatar: '',
      editMode: false
    };

    this.onChange = this.onChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
  }

  // eslint-disable-next-line consistent-return
  onChange(e) {
    const { name, value, files } = e.target;

    if (name === 'avatar') {
      if (!files) {
        return this.setState({ avatar: '' });
      }
      // eslint-disable-next-line no-undef
      const reader = new FileReader();

      reader.onload = ({ target: { result } }) => {
        this.setState({ newAvatar: result, avatar: files[0] });
      };
      reader.readAsDataURL(files[0]);
    } else {
      this.setState({ [name]: value });
    }
  }

  onSubmit(e) {
    // TODO: Add validation.
    e.preventDefault();
    const { pushUpdateCompany } = this.props;
    const { name, title, avatar } = this.state;

    // eslint-disable-next-line no-undef
    const data = new FormData();

    if (name) data.append('name', name);
    if (title) data.append('title', title);
    // We send avatar only if it is empty string (deleted) or if it is blob type (new image).
    // When we have string with length that mean we have avatar url from server.
    if (!avatar.length) data.append('avatar', avatar);

    pushUpdateCompany({ data, handleFinish: this.toggleEditMode });
  }

  onCancel(e) {
    e.preventDefault();

    const { activeRole, rolesPermissions, companies } = this.props;
    const { avatar, name, title } = companies[rolesPermissions[activeRole]];

    this.setState({
      name: name || '',
      title: title || '',
      avatar: avatar || '',
      newAvatar: '',
      editMode: false
    });
  }

  toggleEditMode() {
    this.setState((state) => ({
      editMode: !state.editMode
    }));
  }

  render() {
    const { avatar, newAvatar, name, title, editMode } = this.state;

    return (
      <div className="content">
        <ContentHeader
          editMode={editMode}
          toggleEditMode={this.toggleEditMode}
          displayAvatar
          avatar={newAvatar || avatar}
          onAvatarChange={this.onChange}
          title={name}
          subTitle="89% of clients are satisfied"
          editForm={
            <EditForm
              inputs={[
                {
                  name: 'name',
                  value: name,
                  onChange: this.onChange
                },
                {
                  name: 'title',
                  value: title,
                  onChange: this.onChange
                }
              ]}
              onSubmit={this.onSubmit}
              onCancel={this.onCancel}
            />
          }
          navLinks={[
            { to: routing().overview, title: 'Overview' },
            { to: routing().about, title: 'About' }
          ]}
        />
        {/*{renderRoutes(routes, { ...this.props, editMode })}*/}
        <Switch>
          <WrappedRoute
            exact
            path={routing().about}
            render={() => <About {...this.props} editMode={editMode} />}
          />
          <WrappedRoute
            exact
            path={routing().overview}
            render={() => <Overview {...this.props} editMode={editMode} />}
          />
        </Switch>
      </div>
    );
  }
}

export default ProfileForAdmin;
