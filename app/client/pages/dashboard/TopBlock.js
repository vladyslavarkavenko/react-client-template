import React from 'react';
import { connect } from 'react-redux';

import TopItem from './topBlock/TopItem';
import { fetchTop } from '../../modules/dashboard/dashboardActions';
import dashboardSelectors from '../../modules/dashboard/dashboardSelectors';
import WidgetPlaceholder from '../../components/widgets/WidgetPlaceholder';
import DataFileSvg from '../../../../public/assets/svg/file-chart-line.duotone.svg';
import { LoaderBlock } from '../../components/ui-components/Layout/Loader';

class TopBlock extends React.Component {
  componentDidMount() {
    const { requestKey, status, fetchTop } = this.props;

    if (status !== 'success') {
      fetchTop({ key: requestKey });
    }
  }

  render() {
    const { status, data, requestKey, scoreFormat, noCtruScore } = this.props;

    if (status === 'request') {
      return <LoaderBlock height="203px" />;
    }

    if (!data || data.length === 0) {
      return (
        <div className="top-3">
          <WidgetPlaceholder icon={<DataFileSvg />} />
        </div>
      );
    }

    const list = data.map((item, index) => (
      <TopItem
        noCtruScore={noCtruScore}
        data={item}
        key={`top_${item.id}_${requestKey}`}
        scoreFormat={scoreFormat}
        diff={index < 1 ? 25 : -17}
      />
    ));

    return <ul className="top-widget__list">{list}</ul>;
  }
}

const mapStateToProps = (state, { requestKey }) => {
  const { status, data } = dashboardSelectors.getTopByKey(state, requestKey);
  return { status, data };
};

export default connect(
  mapStateToProps,
  { fetchTop }
)(TopBlock);
