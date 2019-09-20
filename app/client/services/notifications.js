import { toast } from 'react-toastify';

const defaultOptions = {
  position: toast.POSITION.TOP_RIGHT,
  delay: 5000
};

// We can pass our react component for custom notification
export default class Notification {
  static success(message) {
    return toast.success(message, defaultOptions);
  }

  static error(message) {
    return toast.error(message, defaultOptions);
  }

  static info(message) {
    return toast.info(message, defaultOptions);
  }

  static closeAll() {
    toast.dismiss();
  }

  static close(id) {
    toast.dismiss(id);
  }
}
