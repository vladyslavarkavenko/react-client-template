import React from 'react';
import ReactDOM from 'react-dom';
import TimesSvg from '../../../../../public/assets/svg/times.svg';

export default class ModalWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.wrapper = React.createRef();

    this.closeModalHandler = this.closeModalHandler.bind(this);
  }

  componentDidMount() {
    this.wrapper.current.addEventListener('click', this.closeModalHandler);
  }

  componentWillUnmount() {
    this.wrapper.current.removeEventListener('click', this.closeModalHandler);
  }

  closeModalHandler({ target }) {
    if (!target.closest('.modal-wrapper__body')) {
      const { handleModal } = this.props;
      handleModal();
    }
  }

  render() {
    const { children, title, subtitle, handleModal } = this.props;

    const template = (
      <div className="modal-wrapper" ref={this.wrapper}>
        <div className="modal-wrapper__inner">
          <div className="modal-wrapper__body">
            <button type="button" className="m-close-btn" onClick={handleModal}>
              <TimesSvg />
            </button>

            {title && <p className="m-title">{title}</p>}
            {subtitle && <p className="m-subtitle">{subtitle}</p>}
            {children}
          </div>
        </div>
      </div>
    );

    return ReactDOM.createPortal(template, document.getElementById('app'));
  }
}
