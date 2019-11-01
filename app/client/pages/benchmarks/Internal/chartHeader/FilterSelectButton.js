import React from 'react';
import { connect } from 'react-redux';
import { toggleFilterSidebar } from '../../../../modules/benchmarks/benchmarksActions';

function FilterSelectButton({ handleOpen }) {
  return (
    <button type="button" className="bench-select-btn" onClick={() => handleOpen()}>
      <span className="label">Select:</span>
      <span className="title">Criterias type</span>
    </button>
  );
}

const mapDispatchToProps = {
  handleOpen: toggleFilterSidebar
};

export default connect(
  null,
  mapDispatchToProps
)(FilterSelectButton);
