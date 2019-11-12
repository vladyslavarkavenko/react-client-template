import React from 'react';
import { connect } from 'react-redux';

import { fetchStatistics, clearAll } from '../../modules/kpiSettings/kpiSettingsActions';
import SimpleHeader from '../../components/ui-components/Layout/SimpleHeader';
import CtruScoreOption from './CtruScoreOption';
import SatisfactionOption from './SatisfactionOption';
import ParticipationOption from './ParticipationOption';
import NpsOption from './NpsOption';
import kpiSettingsSelectors from '../../modules/kpiSettings/kpiSettingsSelectors';
import { LoaderBlock } from '../../components/ui-components/Layout/Loader';
import SaveBlock from './SaveBlock';

class KpiSettings extends React.Component {
  componentDidMount() {
    const { fetchStatistics } = this.props;
    fetchStatistics();
  }

  componentWillUnmount() {
    const { clearAll } = this.props;
    clearAll();
  }

  render() {
    const { status } = this.props;
    return (
      <>
        <SimpleHeader title="KPI Settings" />
        <div className="kpi-settings" style={{ width: '100%' }}>
          {status === 'request' ? (
            <LoaderBlock height="50vh" />
          ) : (
            <>
              <ul className="kpi-options__list">
                <CtruScoreOption />
                <SatisfactionOption />
                <ParticipationOption />
                <NpsOption />
              </ul>
              <SaveBlock />
            </>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  status: kpiSettingsSelectors.getSettingsStatus(state)
});

const mapDispatchToProps = { fetchStatistics, clearAll };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KpiSettings);
