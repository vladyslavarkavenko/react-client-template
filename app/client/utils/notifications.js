import { toast } from 'react-toastify';
import i18next from 'i18next';
import getErrorMessage from './getErrorMessage';

// We can pass our react component for custom notification
export default class Notification {
  static success(message) {
    console.log('Notification:', message);
    return toast.success(message);
  }

  static error(message) {
    if (typeof message === 'object') {
      message = getErrorMessage(message);
    }

    console.error('Notification:', message);
    return toast.error(message || i18next.t('notifications.defaultError'));
  }

  static info(message) {
    console.log('Notification:', message);
    return toast.info(message);
  }

  static closeAll() {
    toast.dismiss();
  }

  static close(id) {
    toast.dismiss(id);
  }
}
