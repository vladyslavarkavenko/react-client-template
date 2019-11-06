import React from 'react';
import { connect } from 'react-redux';

import Radar from '../../components/widgets/radar/Radar';
import RadarTitle from '../../components/widgets/radar/RadarTitle';
import BlockWrapper from '../../components/widgets/BlockWrapper';
import { LoaderBlock } from '../../components/ui-components/Layout/Loader';
import { selectRadarOption } from '../../modules/customerDashboard/customerDashboardActions';
import customerDashboardSelectors from '../../modules/customerDashboard/customerDashboardSelectors';

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

    return (
      <BlockWrapper
        title={
          <RadarTitle options={options} selected={selected} handleSelect={this.handleSelect} />
        }
      >
        {status === 'request' ? <LoaderBlock height="600px" /> : <Radar data={data} />}
      </BlockWrapper>
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
