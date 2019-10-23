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

export default (OriginalComponent) => {
  class ForCompanyHOC extends React.Component {
    constructor(props) {
      super(props);

      this.onChange = this.onChange.bind(this);
      this.saveChanges = this.saveChanges.bind(this);
      this.cancelChanges = this.cancelChanges.bind(this);
    }

    // eslint-disable-next-line consistent-return
    onChange(e) {
      e.persist && e.persist();
      const { updateCompany } = this.props;

      const { name, value, files } = e.target;

      if (name === 'avatar') {
        if (!files) {
          return updateCompany({ avatar: '', newAvatar: undefined });
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

    saveChanges(saveData, cb) {
      const { setCompanyErrors, pushUpdateCompany, activeEditCompany } = this.props;

      const { errors, isValid } = validateCompany(activeEditCompany, saveData);

      if (!isValid) {
        return setCompanyErrors(errors);
      }

      // eslint-disable-next-line no-undef
      const data = new FormData();
      saveData.forEach((key) => {
        if (key === 'avatar') {
          const avatar = activeEditCompany.avatar || '';
          // eslint-disable-next-line no-undef
          if (avatar instanceof File || !avatar) {
            data.append(key, avatar);
          }
        } else {
          data.append(key, activeEditCompany[key]);
        }
      });

      return pushUpdateCompany({ data, cb });
    }

    cancelChanges(resetData) {
      const { company, updateCompany } = this.props;

      if (!resetData) {
        resetData = company;
      } else {
        resetData.forEach((key) => {
          resetData[key] = company[key];
        });
      }

      updateCompany({ ...resetData });
    }

    render() {
      const { isEdit, errors, history, activeEditCompany, editModeCompanies } = this.props;

      return (
        <OriginalComponent
          isEdit={isEdit}
          errors={errors}
          history={history}
          data={activeEditCompany}
          onChange={this.onChange}
          saveChanges={this.saveChanges}
          toggleEditMode={editModeCompanies}
          cancelChanges={this.cancelChanges}
        />
      );
    }
  }

  const mapStateToProps = (state) => ({
    errors: companiesSelectors.errors(state),
    company: companiesSelectors.getCurrentCompany(state),
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
  )(ForCompanyHOC);
};
