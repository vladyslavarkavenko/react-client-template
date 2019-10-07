export default function getErrorMessage(err) {
  try {
    if (err.response && err.response.data) {
      const serverErrors = Object.values(err.response.data);

      if (serverErrors.length) {
        return serverErrors.join('\n');
      }
    }

    return err.message;
  } catch (e) {
    return '';
  }
}
