import React from 'react';
import ReactDOM from 'react-dom';
/* eslint-disable */

import Content from './filterSidebar/components/Content';
import { connect } from 'react-redux';
import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import benchmarksSelectors from '../../../modules/benchmarks/benchmarksSelectors';
import { toggleFilterSidebar, fetchFilters } from '../../../modules/benchmarks/benchmarksActions';

class FilterSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.targetElement;
    this.wrapper = React.createRef();

    this.closeModalHandler = this.closeModalHandler.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { isOpen } = this.props;
    if (prevProps.isOpen !== isOpen) {
      if (isOpen) {
        disableBodyScroll(this.targetElement, { reserveScrollBarGap: true });
      } else {
        enableBodyScroll(this.targetElement);
      }
    }
  }

  componentDidMount() {
    this.targetElement = this.wrapper.current;

    const { isOpen, fetchFilters } = this.props;

    fetchFilters();

    if (isOpen) {
      disableBodyScroll(this.targetElement, { reserveScrollBarGap: true });
    }
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }

  closeModalHandler({ target, currentTarget }) {
    if (currentTarget === target) {
      const { handleModal } = this.props;
      handleModal();
    }
  }

  render() {
    const { handleModal, isOpen } = this.props;

    return ReactDOM.createPortal(
      <Content
        handleModal={handleModal}
        closeModalHandler={this.closeModalHandler}
        isOpen={isOpen}
        forwardRef={this.wrapper}
      />,
      document.getElementById('app')
    );
  }
}

const mapStateToProps = (state) => ({
  isOpen: benchmarksSelectors.isFilterOpen(state)
});

const mapDispatchToProps = {
  handleModal: toggleFilterSidebar,
  fetchFilters
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterSidebar);
