import React from 'react';
import { connect } from 'react-redux';

import customerDashboardSelectors from '../../modules/customerDashboard/customerDashboardSelectors';
import { LoaderBlock } from '../../components/ui-components/Layout/Loader';
import CompanyItem from './profileList/CompanyItem';
import ManagerItem from './profileList/ManagerItem';

class ProfileList extends React.Component {
  constructor(props) {
    super(props);

    this.lengthLimit = 3;

    this.state = {
      isExpanded: false
    };

    this.handleExpand = this.handleExpand.bind(this);
  }

  handleExpand() {
    this.setState({
      isExpanded: true
    });
  }

  render() {
    const { isExpanded } = this.state;

    const { companyStatus, managerStatus, managers, companies } = this.props;
    if (companyStatus === 'request' || managerStatus === 'request') {
      return <LoaderBlock height="15vh" />;
    }

    const companyList = companies.map((company) => (
      <CompanyItem key={`${company.id}_list_c`} company={company} />
    ));

    const managerList = managers.map((manager) => (
      <ManagerItem key={`${manager.id}_list_m`} manager={manager} />
    ));

    const list = [...companyList, ...managerList];

    return (
      <div className="profile__wrapper">
        <ul className="profile__list">{isExpanded ? list : list.slice(0, this.lengthLimit)}</ul>
        <div className="profile__show-more">
          {list.length > this.lengthLimit && !isExpanded && (
            <button type="button" className="see-more" onClick={this.handleExpand}>
              Show More <span>→</span>
            </button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { status: companyStatus, data: companies } = customerDashboardSelectors.companies(state);
  const { status: managerStatus, data: managers } = customerDashboardSelectors.managers(state);

  return { companyStatus, managerStatus, managers, companies };
};

export default connect(mapStateToProps)(ProfileList);
