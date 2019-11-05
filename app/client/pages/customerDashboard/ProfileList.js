import React from 'react';
import { connect } from 'react-redux';

import customerDashboardSelectors from '../../modules/customerDashboard/customerDashboardSelectors';
import { LoaderBlock } from '../../components/ui-components/Layout/Loader';
import CompanyItem from './CompanyItem';
import ManagerItem from './ManagerItem';

function ProfileList({ status, managers, companies }) {
  if (status === 'request') {
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
  const { status, managers, companies } = customerDashboardSelectors.list(state);

  return { status, managers, companies };
};

export default connect(mapStateToProps)(ProfileList);
