export function setLocalData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getLocalData(key) {
  const data = JSON.parse(localStorage.getItem(key));
  return data;
}

export function clearLocalData(keys) {
  keys.forEach((key) => localStorage.removeItem(key));
}
