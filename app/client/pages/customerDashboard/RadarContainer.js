import React from 'react';
import { connect } from 'react-redux';

import Radar from '../../components/widgets/radar/Radar';
import RadarTitle from '../../components/widgets/radar/RadarTitle';
import BlockWrapper from '../../components/widgets/BlockWrapper';
import { selectRadarOption } from '../../modules/customerDashboard/customerDashboardActions';
import customerDashboardSelectors from '../../modules/customerDashboard/customerDashboardSelectors';
import RadarExpiredBanner from '../../components/widgets/radar/RadarExpiredBanner';

class RadarContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(value) {
    const { selectRadarOption } = this.props;

    selectRadarOption(value);
  }

  render() {
    const { status, data, options, selected } = this.props;

    const detailsData = selected
      ? {
          type: selected.type,
          id: selected.value
        }
      : {};

    return (
      <>
        <BlockWrapper
          title={
            <RadarTitle options={options} selected={selected} handleSelect={this.handleSelect} />
          }
        >
          <Radar data={data} detailsData={detailsData} status={status} />
        </BlockWrapper>
        <RadarExpiredBanner selected={selected} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { status, data, selected, options } = customerDashboardSelectors.radar(state);

  return { status, data, selected, options };
};

const mapDispatchToProps = {
  selectRadarOption
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RadarContainer);
