import React from 'react';

/* eslint-disable */
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import TimesSvg from '../../../../public/assets/svg/times.svg';
import ArrowSvg from '../../../../public/assets/svg/arrow-down.svg';
import benchmarksSelectors from '../../modules/benchmarks/benchmarksSelectors';
import { toggleFilterSidebar } from '../../modules/benchmarks/benchmarksActions';
import CheckboxInput from '../../components/ui-components/Form/CheckboxInput';

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

    // this.wrapper.current.addEventListener('click', this.closeModalHandler);
    const { isOpen } = this.props;

    if (isOpen) {
      disableBodyScroll(this.targetElement, { reserveScrollBarGap: true });
    }
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
    // this.wrapper.current.removeEventListener('click', this.closeModalHandler);
  }

  closeModalHandler({ target, currentTarget }) {
    console.log(target);
    if (currentTarget === target) {
      const { handleModal } = this.props;
      handleModal();
    }
  }

  render() {
    const { children, title, subtitle, handleModal, isOpen } = this.props;

    const template = (
      <aside
        className={`filter-sidebar__wrapper ${isOpen ? 'active' : ''}`}
        ref={this.wrapper}
        onClick={this.closeModalHandler}
      >
        <div className="filter-sidebar__inner">
          <div className="filter-sidebar__content">
            <div className="filter-sidebar__head">
              <p className="title">
                Filters
                <span className="close-btn" onClick={() => handleModal()}>
                  <TimesSvg />
                </span>
              </p>

              <ul className="selected-filters__list">
                <li className="selected-filters__item">
                  <span className="label">Good performance</span>
                  <button type="button" className="delete-btn">
                    <TimesSvg />
                  </button>
                </li>

                <li className="selected-filters__item">
                  <span className="label">Safe</span>
                  <button type="button" className="delete-btn">
                    <TimesSvg />
                  </button>
                </li>

                <li className="selected-filters__item">
                  <span className="label">Exclusive</span>
                  <button type="button" className="delete-btn">
                    <TimesSvg />
                  </button>
                </li>
              </ul>
            </div>

            <div className="filter-sidebar__body">
              <ul className="subject__list">
                <li className="subject__item active">
                  <button type="button" className="head">
                    <span className="label">Mortage</span>

                    <div className="controls">
                      <span className="count">3</span>
                      <ArrowSvg />
                    </div>
                  </button>

                  <ul className="topic__list">
                    <li className="topic__item">
                      <CheckboxInput withFill labelText="Good performance" />
                    </li>

                    <li className="topic__item">
                      <CheckboxInput withFill labelText="Low commissions" checked />
                    </li>

                    <li className="topic__item">
                      <CheckboxInput withFill labelText="Low fees" />
                    </li>
                  </ul>
                </li>
                <li className="subject__item">
                  <button type="button" className="head">
                    <span className="label">E-banking</span>

                    <div className="controls">
                      {/*<span className="count">3</span>*/}
                      <ArrowSvg />
                    </div>
                  </button>

                  <ul className="topic__list">
                    <li className="topic__item">
                      <CheckboxInput withFill labelText="Good performance" />
                    </li>

                    <li className="topic__item">
                      <CheckboxInput withFill labelText="Low commissions" />
                    </li>

                    <li className="topic__item">
                      <CheckboxInput withFill labelText="Low fees" />
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
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
