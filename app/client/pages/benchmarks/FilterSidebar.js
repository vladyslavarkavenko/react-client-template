import React from 'react';

/* eslint-disable */
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import TimesSvg from '../../../../public/assets/svg/times.svg';
import benchmarksSelectors from '../../modules/benchmarks/benchmarksSelectors';
import { toggleFilterSidebar } from '../../modules/benchmarks/benchmarksActions';

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
        disableBodyScroll(this.targetElement);
      } else {
        enableBodyScroll(this.targetElement);
      }
    }
  }

  componentDidMount() {
    this.targetElement = this.wrapper.current;

    this.wrapper.current.addEventListener('click', this.closeModalHandler);
    const { isOpen } = this.props;

    if (isOpen) {
      disableBodyScroll(this.targetElement);
    }
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
    this.wrapper.current.removeEventListener('click', this.closeModalHandler);
  }

  closeModalHandler({ target }) {
    if (!target.closest('filter-sidebar__wrapper')) {
      const { handleModal } = this.props;
      handleModal();
    }
  }

  render() {
    const { children, title, subtitle, handleModal, isOpen } = this.props;

    const template = (
      <aside className={`filter-sidebar__wrapper ${isOpen ? 'active' : ''}`} ref={this.wrapper}>
        <div className="filter_sidebar__body">Content</div>
      </aside>
    );

    return ReactDOM.createPortal(template, document.getElementById('app'));
  }
}

const mapStateToProps = (state) => ({
  isOpen: benchmarksSelectors.isFilterOpen(state)
});

const mapDispatchToProps = {
  handleModal: toggleFilterSidebar
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterSidebar);
