import React from 'react';
import { connect } from 'react-redux';

import { validateUser } from '../../../utils/validator';
import authSelectors from '../../../modules/auth/authSelectors';
import {
  updateUser,
  setUserErrors,
  editModeUser,
  pushUpdateUser
} from '../../../modules/auth/authActions';
import { getRadarScores } from '../../../modules/profile/profileActions';
import profileSelectors from '../../../modules/profile/profileSelectors';

export default (OriginalComponent) => {
  class ForManagerHOC extends React.Component {
    constructor(props) {
      super(props);

      this.save = this.save.bind(this);
      this.reset = this.reset.bind(this);
      this.onChange = this.onChange.bind(this);
    }

    // eslint-disable-next-line consistent-return
    onChange(e) {
      e.persist && e.persist();
      const { updateUser } = this.props;

      const { name, value, files } = e.target;

      if (name === 'avatar') {
        if (!files) {
          return updateUser({ avatar: '', newAvatar: undefined });
        }
        // eslint-disable-next-line no-undef
        const reader = new FileReader();

        reader.onload = ({ target: { result } }) => {
          updateUser({ newAvatar: result, avatar: files[0] });
        };
        reader.readAsDataURL(files[0]);
      } else {
        updateUser({ [name]: value });
      }
    }

    save(e) {
      e.preventDefault();
      const { setUserErrors, pushUpdateUser, activeEditUser } = this.props;
      const { errors, isValid } = validateUser(activeEditUser);

      if (!isValid) {
        return setUserErrors(errors);
      }

      // eslint-disable-next-line no-undef
      const data = new FormData();
      const { avatar, firstName, lastName, phone, email, about, location, title } = activeEditUser;

      // eslint-disable-next-line no-undef
      if (avatar instanceof File) {
        data.append('avatar', avatar);
      }
      data.append('phone', phone);
      data.append('email', email);
      data.append('about', about);
      data.append('title', title);
      data.append('lastName', lastName);
      data.append('location', location);
      data.append('firstName', firstName);

      return pushUpdateUser({ data });
    }

    reset(e) {
      e.preventDefault();
      const { user, updateUser, editModeUser } = this.props;

      editModeUser();
      updateUser({ ...user, newAvatar: undefined });
    }

    render() {
      const { updateUser, pushUpdateUser, editModeUser, activeEditUser, ...rest } = this.props;

      return (
        <OriginalComponent
          {...rest}
          data={activeEditUser}
          toggleEditMode={editModeUser}
          onChange={this.onChange}
          reset={this.reset}
          save={this.save}
        />
      );
    }
  }

  const mapStateToProps = (state) => ({
    errors: authSelectors.errors(state),
    user: authSelectors.user(state),
    isEdit: authSelectors.isEdit(state),
    activeEditUser: authSelectors.activeEditUser(state),
    radarData: profileSelectors.radarData(state),
    avgSatisfaction: profileSelectors.avgSatisfaction(state)
  });

  const mapDispatchToProps = {
    updateUser,
    setUserErrors,
    editModeUser,
    pushUpdateUser,
    getRadarScores
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(ForManagerHOC);
};
