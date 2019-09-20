export default function getErrorMessage(err) {
  try {
    if (err.data) {
      const serverErrors = Object.values(err.data);

      if (serverErrors.length) {
        return serverErrors.join('\n');
      }

      return err.statusText;
    }

    return err.message;
  } catch (e) {
    return '';
  }
}
