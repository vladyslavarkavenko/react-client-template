import React from 'react';
import { connect } from 'react-redux';

// import {
//   validateEmail,
//   validatePhone,
//   validateLocation,
//   validateFirstName,
//   validateLastName,
//   validateUserAbout,
//   validateUserTitle,
// } from '../../../utils/validator';
import authSelectors from '../../../modules/auth/authSelectors';
import {
  updateUser,
  setUserErrors,
  editModeUser,
  pushUpdateUser
} from '../../../modules/auth/authActions';

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
      const {
        setUserErrors,
        pushUpdateUser,
        activeEditUser: { avatar, firstName, lastName, phone, email, about, location, title }
      } = this.props;

      // eslint-disable-next-line no-undef
      const data = new FormData();
      const errors = {};

      if (!avatar.length) {
        data.append('avatar', avatar);
      }
      // TODO: Add validation
      data.append('firstName', firstName);
      data.append('lastName', lastName);
      data.append('phone', phone);
      data.append('email', email);
      data.append('about', about);
      data.append('location', location);
      data.append('title', title);

      if (Object.keys(errors).length) {
        setUserErrors(errors);
      } else {
        pushUpdateUser({ data });
      }
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
    activeEditUser: authSelectors.activeEditUser(state)
  });

  const mapDispatchToProps = {
    updateUser,
    setUserErrors,
    editModeUser,
    pushUpdateUser
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(ForManagerHOC);
};
