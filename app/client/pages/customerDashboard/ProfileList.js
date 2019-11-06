import React from 'react';
import { connect } from 'react-redux';

import customerDashboardSelectors from '../../modules/customerDashboard/customerDashboardSelectors';
import { LoaderBlock } from '../../components/ui-components/Layout/Loader';
import CompanyItem from './CompanyItem';
import ManagerItem from './ManagerItem';

function ProfileList({ companyStatus, managerStatus, managers, companies }) {
  if (companyStatus === 'request' || managerStatus === 'request') {
    return <LoaderBlock height="15vh" />;
  }

  const companyList = companies.map((company) => (
    <CompanyItem key={`${company.id}_list_c`} company={company} />
  ));
  const managerList = managers.map((manager) => (
    <ManagerItem key={`${manager.id}_list_m`} manager={manager} />
  ));

  return (
    <ul className="profile__list">
      {companyList}
      {managerList}
    </ul>
  );
}

const mapStateToProps = (state) => {
  const { status: companyStatus, data: companies } = customerDashboardSelectors.companies(state);
  const { status: managerStatus, data: managers } = customerDashboardSelectors.managers(state);

  return { companyStatus, managerStatus, managers, companies };
};

export default connect(mapStateToProps)(ProfileList);
