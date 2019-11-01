import React from 'react';
import { connect } from 'react-redux';

import benchmarksSelectors from '../../../modules/benchmarks/benchmarksSelectors';
import CompareWidget from '../../../components/widgets/compare/CompareWidget';

function CompareWidgetContainer({ staff }) {
  return <CompareWidget staff={staff} />;
}

const mapStateToProps = (state) => ({
  staff: benchmarksSelectors.getFullStaff(state)
});

export default connect(mapStateToProps)(CompareWidgetContainer);
