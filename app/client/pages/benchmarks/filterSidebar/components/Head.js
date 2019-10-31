import React from 'react';
import { connect } from 'react-redux';

import TimesSvg from '../../../../../../public/assets/svg/times.svg';
import benchmarksSelectors from '../../../../modules/benchmarks/benchmarksSelectors';
import { selectFilter } from '../../../../modules/benchmarks/benchmarksActions';

function Head({ handleModal, selected, handleDelete }) {
  const list = selected.map((item) => (
    <li className="selected-filters__item" key={`${item.id}_s_f`}>
      <span className="label">{item.name}</span>
      <button type="button" className="delete-btn" onClick={() => handleDelete(item)}>
        <TimesSvg />
      </button>
    </li>
  ));

  return (
    <div className="filter-sidebar__head">
      <p className="title">
        Filters
        <span className="close-btn" onClick={() => handleModal()}>
          <TimesSvg />
        </span>
      </p>

      <ul className="selected-filters__list">{list}</ul>
    </div>
  );
}
const mapStateToProps = (state) => ({
  selected: benchmarksSelectors.getSelectedFilters(state)
});

const mapDispatchToProps = {
  handleDelete: selectFilter // redux handles toggle logic
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Head);
