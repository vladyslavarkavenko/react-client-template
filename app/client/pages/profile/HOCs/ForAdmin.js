import React from 'react';
import { connect } from 'react-redux';

import { validateCompany } from '../../../utils/validator';
import companiesSelectors from '../../../modules/companies/companiesSelectors';
import {
  editModeCompanies,
  pushUpdateCompany,
  setCompanyErrors,
  updateCompany
} from '../../../modules/companies/companiesActions';

import { getRadarScores } from '../../../modules/profile/profileActions';

import profileSelectors from '../../../modules/profile/profileSelectors';

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
      e.persist && e.persist();
      const { updateCompany } = this.props;

      const { name, value, files } = e.target;

      if (name === 'avatar') {
        if (!files) {
          return updateCompany({
            avatar: '',
            newAvatar: undefined
          });
        }
        // eslint-disable-next-line no-undef
        const reader = new FileReader();

        reader.onload = ({ target: { result } }) => {
          updateCompany({
            newAvatar: result,
            avatar: files[0]
          });
        };
        reader.readAsDataURL(files[0]);
      } else {
        updateCompany({ [name]: value });
      }
    }

    save(e) {
      e.preventDefault();
      const { setCompanyErrors, pushUpdateCompany, activeEditCompany } = this.props;
      const { errors, isValid } = validateCompany(activeEditCompany);

      if (!isValid) {
        return setCompanyErrors(errors);
      }

      // eslint-disable-next-line no-undef
      const data = new FormData();
      const { avatar, name, title, phone, web, email, about } = activeEditCompany;

      if (!avatar.length) {
        console.log('typeof avatar', typeof avatar);
        data.append('avatar', avatar);
      }
      data.append('web', web);
      data.append('name', name);
      data.append('title', title);
      data.append('phone', phone);
      data.append('email', email);
      data.append('about', about);

      return pushUpdateCompany({ data });
    }

    reset(e) {
      e.preventDefault();
      const { data, activeEditCompany, updateCompany, editModeCompanies } = this.props;

      editModeCompanies();
      updateCompany({
        ...data[activeEditCompany.id],
        newAvatar: undefined
      });
    }

    render() {
      const {
        updateCompany,
        pushUpdateCompany,
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
    activeEditCompany: companiesSelectors.activeEditCompany(state),
    grades: profileSelectors.grades(state),
    avgSatisfaction: profileSelectors.avgSatisfaction(state)
  });

  const mapDispatchToProps = {
    updateCompany,
    getRadarScores,
    setCompanyErrors,
    editModeCompanies,
    pushUpdateCompany
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(ForAdminHOC);
};
