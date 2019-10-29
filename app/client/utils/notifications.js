import { toast } from 'react-toastify';
import i18next from 'i18next';
import getErrorMessage from './getErrorMessage';

// We can pass our react component for custom notification
export default class Notification {
  static success(message, config) {
    console.log('Notification:', message);
    return toast.success(message, config);
  }

  static error(message, config) {
    if (typeof message === 'object') {
      message = getErrorMessage(message);
    }

    console.error('Notification:', message);
    return toast.error(message || i18next.t('notifications.defaultError'), config);
  }

  static info(message, config) {
    console.log('Notification:', message);
    return toast.info(message, config);
  }

  static closeAll() {
    toast.dismiss();
  }

  static close(id) {
    toast.dismiss(id);
  }
}
