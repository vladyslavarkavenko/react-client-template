import React from 'react';
import ExclamationCircleSvg from '../../../../public/assets/svg/exclamation-circle.solid.svg';
import CheckCircleSvg from '../../../../public/assets/svg/check-circle.solid.svg';
import InfoCircleSvg from '../../../../public/assets/svg/info-circle.solid.svg';

export default class Alert extends React.Component {
  static get info() {
    return 'info';
  }

  static get success() {
    return 'success';
  }

  static get failure() {
    return 'failure';
  }

  render() {
    const { type, icon, message, children } = this.props;
    return (
      <div className={`notify ${type}`}>
        <span className="notify-label" />
        <span className="notify-icon">
          {type === Alert.info && (icon || <InfoCircleSvg />)}
          {type === Alert.success && (icon || <CheckCircleSvg />)}
          {type === Alert.failure && (icon || <ExclamationCircleSvg />)}
        </span>
        <span className="notify-message">{message}</span>
        {children}
      </div>
    );
  }
}
