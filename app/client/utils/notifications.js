import { toast } from 'react-toastify';
import i18next from 'i18next';
import getErrorMessage from './getErrorMessage';

const defaultOptions = {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 4000
};

// We can pass our react component for custom notification
export default class Notification {
  static success(message) {
    console.log('Notification:', message);
    return toast.success(message, defaultOptions);
  }

  static error(message) {
    if (typeof message === 'object') {
      message = getErrorMessage(message);
    }

    console.error('Notification:', message);
    return toast.error(message || i18next.t('notifications.defaultError'), defaultOptions);
  }

  static info(message) {
    console.log('Notification:', message);
    return toast.info(message, defaultOptions);
  }

  static closeAll() {
    toast.dismiss();
  }

  static close(id) {
    toast.dismiss(id);
  }
}
