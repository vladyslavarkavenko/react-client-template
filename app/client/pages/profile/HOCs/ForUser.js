import React from 'react';
import { connect } from 'react-redux';

import authSelectors from '../../../modules/auth/authSelectors';
import {
  updateUser,
  setUserErrors,
  editModeUser,
  pushUpdateUser
} from '../../../modules/auth/authActions';
import { validateUser } from '../../../utils/validator';

export default function ForUser(OriginalComponent) {
  class ForCustomerHOC extends React.Component {
    constructor(props) {
      super(props);

      this.onChange = this.onChange.bind(this);
      this.saveChanges = this.saveChanges.bind(this);
      this.cancelChanges = this.cancelChanges.bind(this);
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

    saveChanges(saveData, cb) {
      const { setUserErrors, pushUpdateUser, activeEditUser } = this.props;

      const { errors, isValid } = validateUser(activeEditUser, saveData);

      if (!isValid) {
        return setUserErrors(errors);
      }

      // eslint-disable-next-line no-undef
      const data = new FormData();
      saveData.forEach((key) => {
        if (key === 'avatar') {
          const avatar = activeEditUser.avatar || '';
          // eslint-disable-next-line no-undef
          if (avatar instanceof File || !avatar) {
            data.append(key, avatar);
          }
        } else {
          data.append(key, activeEditUser[key]);
        }
      });

      return pushUpdateUser({ data, cb });
    }

    cancelChanges(resetData) {
      const { user, updateUser } = this.props;

      if (!resetData) {
        resetData = user;
      } else {
        resetData.forEach((key) => {
          resetData[key] = user[key];
        });
      }

      updateUser({ ...resetData });
    }

    render() {
      const { isEdit, errors, editModeUser, activeEditUser, history } = this.props;

      return (
        <OriginalComponent
          isEdit={isEdit}
          errors={errors}
          history={history}
          data={activeEditUser}
          onChange={this.onChange}
          toggleEditMode={editModeUser}
          saveChanges={this.saveChanges}
          cancelChanges={this.cancelChanges}
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
  )(ForCustomerHOC);
}
