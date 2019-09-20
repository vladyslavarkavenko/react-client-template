import React from 'react';
import { connect } from 'react-redux';

import {
  validateCompanyAbout,
  validateCompanyName,
  validateEmail,
  validatePhone,
  validateCompanyTitle,
  validateURL
} from '../../../utils/validator';
import companiesSelectors from '../../../modules/companies/companiesSelectors';
import {
  editModeCompanies,
  pushUpdateCompany,
  setCompanyErrors,
  updateCompany
} from '../../../modules/companies/companiesActions';

export default (OriginalComponent) => {
  class ForAdminHOC extends React.Component {
    constructor(props) {
      super(props);

      this.save = this.save.bind(this);
      this.reset = this.reset.bind(this);
      this.onChange = this.onChange.bind(this);
    }

    // eslint-disable-next-line consistent-return
    onChange(e) {
      const { updateCompany } = this.props;

      console.log(e.target);
      const { name, value, files } = e.target;

      if (name === 'avatar') {
        if (!files) {
          return updateCompany({ avatar: '' });
        }
        // eslint-disable-next-line no-undef
        const reader = new FileReader();

        reader.onload = ({ target: { result } }) => {
          updateCompany({ newAvatar: result, avatar: files[0] });
        };
        reader.readAsDataURL(files[0]);
      } else {
        updateCompany({ [name]: value });
      }
    }

    save(e) {
      e.preventDefault();
      const {
        setCompanyErrors,
        pushUpdateCompany,
        activeEditCompany: { avatar, name, title, phone, web, email, about }
      } = this.props;

      // eslint-disable-next-line no-undef
      const data = new FormData();
      const errors = {};

      if (!avatar.length) {
        data.append('avatar', avatar);
      }

      if (validateCompanyName(name)) {
        data.append('name', name);
      } else {
        errors.name = 'Invalid name';
      }

      if (validateCompanyTitle(title)) {
        data.append('title', title);
      } else {
        errors.title = 'Invalid title';
      }

      if (validatePhone(phone)) {
        data.append('phone', phone);
      } else {
        errors.phone = 'Invalid phone';
      }

      if (validateEmail(email)) {
        data.append('email', email);
      } else {
        errors.email = 'Invalid email';
      }

      if (validateURL(web)) {
        data.append('web', web);
      } else {
        errors.web = 'Invalid web';
      }

      if (validateCompanyAbout(about)) {
        data.append('about', about);
      } else {
        errors.about = 'Invalid about';
      }

      if (Object.keys(errors).length) {
        setCompanyErrors(errors);
      } else {
        pushUpdateCompany({ data });
      }
    }

    reset(e) {
      e.preventDefault();
      const { data, activeEditCompany, updateCompany, editModeCompanies } = this.props;

      editModeCompanies();
      updateCompany({ ...data[activeEditCompany.id], newAvatar: undefined });
    }

    render() {
      const {
        updateCompany,
        pushUpdateCompany,
        resetCompany,
        editModeCompanies,
        activeEditCompany,
        ...rest
      } = this.props;

      return (
        <OriginalComponent
          {...rest}
          data={activeEditCompany}
          toggleEditMode={editModeCompanies}
          onChange={this.onChange}
          reset={this.reset}
          save={this.save}
        />
      );
    }
  }

  const mapStateToProps = (state) => ({
    errors: companiesSelectors.errors(state),
    data: companiesSelectors.data(state),
    isEdit: companiesSelectors.isEdit(state),
    activeEditCompany: companiesSelectors.activeEditCompany(state)
  });

  const mapDispatchToProps = {
    updateCompany,
    setCompanyErrors,
    editModeCompanies,
    pushUpdateCompany
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(ForAdminHOC);
};
