import React from 'react';
import { connect } from 'react-redux';

import CtruScoreCircle from '../../components/widgets/CtruScoreCircle';
import dashboardSelectors from '../../modules/dashboard/dashboardSelectors';
import { fetchStatistics } from '../../modules/dashboard/dashboardActions';
import { LoaderBlock } from '../../components/ui-components/Layout/Loader';

class CtruScoreForCompany extends React.Component {
  componentDidMount() {
    const { fetchStatistics, statistics } = this.props;

    !statistics && fetchStatistics && fetchStatistics();
  }

  render() {
    const { statistics, status } = this.props;

    if (status === 'request') {
      return <LoaderBlock height="15.75rem" />;
    }

    const { ctruScore, numberOpinions } = statistics || {};
    return <CtruScoreCircle ctruScore={ctruScore} reviewsCount={numberOpinions} />;
  }
}

const mapStateToProps = (state) => ({
  statistics: dashboardSelectors.companyData(state),
  status: dashboardSelectors.companyDataStatus(state)
});

export default connect(
  mapStateToProps,
  { fetchStatistics }
)(CtruScoreForCompany);
