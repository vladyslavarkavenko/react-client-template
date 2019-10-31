import React from 'react';
import { connect } from 'react-redux';

import Block from '../opinions/Block';
import { parseManager } from '../opinions/helpers';
import opinionsSelectors from '../../modules/opinions/opinionsSelectors';
import companiesSelectors from '../../modules/companies/companiesSelectors';
import { fetchStaffStatistics } from '../../modules/opinions/opinionsActions';
import Button from '../../components/ui-components/Form/Button';

class MyManagers extends React.Component {
  componentDidMount() {
    const { staffStatistics, fetchStaffStatistics } = this.props;

    !staffStatistics && fetchStaffStatistics();
  }

  render() {
    const { managers, staffStatistics } = this.props;

    if (!staffStatistics) {
      return (
        <div className="info-cards">
          <div className="empty-header">
            <h1>My managers</h1>
          </div>
        </div>
      );
    }

    return (
      <div className="info-cards">
        <div className="empty-header">
          <h1>My managers</h1>
        </div>
        <div className="body">
          <ul>
            {managers.map((manager) => {
              const data = parseManager(manager, staffStatistics);

              return <Block shareOpinion withContact key={manager.id} {...data} />;
            })}
          </ul>
          <Button className="others-btn block-btn" title="Other managers" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  managers: companiesSelectors.getManagersList(state),
  staffStatistics: opinionsSelectors.staffStatistics(state)
});

export default connect(
  mapStateToProps,
  { fetchStaffStatistics }
)(MyManagers);
