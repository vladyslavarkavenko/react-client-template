// TODO: Rewrite alert to notifications.
export default function(err) {
  const { data } = err;
  if (data.detail) {
    return window.alert(data.detail);
  }
  return Object.keys(data).forEach((key) => data[key].forEach((msg) => window.alert(msg)));
}
