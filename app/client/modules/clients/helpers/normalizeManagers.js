export default function normalizeManagers(managers) {
  return managers.map((manager) => ({
    label: `${manager.firstName} ${manager.lastName}`,
    value: manager.id
  }));
}
