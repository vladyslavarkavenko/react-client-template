import React from 'react';
import { connect } from 'react-redux';

import CtruScoreCircle from '../../components/widgets/CtruScoreCircle';
import dashboardSelectors from '../../modules/dashboard/dashboardSelectors';
import { fetchStatistics } from '../../modules/dashboard/dashboardActions';

class CtruScoreForCompany extends React.Component {
  componentDidMount() {
    const { fetchStatistics, statistics } = this.props;

    !statistics && fetchStatistics && fetchStatistics();
  }

  render() {
    const { statistics } = this.props;

    if (!statistics) {
      return null;
    }

    const { ctruScore, numberOpinions } = statistics;
    return <CtruScoreCircle ctruScore={ctruScore} reviewsCount={numberOpinions} />;
  }
}

const mapStateToProps = (state) => ({
  statistics: dashboardSelectors.companyData(state)
});

export default connect(
  mapStateToProps,
  { fetchStatistics }
)(CtruScoreForCompany);
