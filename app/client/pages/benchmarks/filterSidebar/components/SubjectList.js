import React from 'react';

/* eslint-disable */
import { connect } from 'react-redux';

import SubjectItem from './SubjectItem';
import { selectFilter } from '../../../../modules/benchmarks/benchmarksActions';
import benchmarksSelectors from '../../../../modules/benchmarks/benchmarksSelectors';
import { LoaderBlock } from '../../../../components/ui-components/Layout/Loader';

function SubjectList({ status, subjects, selected, selectFilter, clearFilters, isOpen }) {
  const list = subjects.map((subject) => {
    const selectedSlice = selected.filter((item) => item.subjectId === subject.id);
    return (
      <SubjectItem
        key={`${subject.id}_s_f`}
        data={subject}
        selected={selectedSlice}
        selectFilter={selectFilter}
      />
    );
  });

  return (
    <>
      <ul className="subject__list">{status === 'success' ? list : <LoaderBlock />}</ul>
      {isOpen && selected.length !== 0 && (
        <div className="subject__buttons">
          <button type="button" className="clear-btn" onClick={() => clearFilters()}>
            Clear
          </button>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  status: benchmarksSelectors.getFilterStatus(state),
  subjects: benchmarksSelectors.getFilterData(state),
  selected: benchmarksSelectors.getSelectedFilters(state)
});

const clearFilters = selectFilter.fulfill;

const mapDispatchToProps = {
  selectFilter,
  clearFilters
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectList);
