interface BKLocalStorageInfo {
  authToken: string | null;
}

let localStorageInfo: BKLocalStorageInfo = {};

export function setStoreItem(item: Object) {
  localStorageInfo = { ...localStorageInfo, ...item };
  localStorage.setItem('BK$WEB$UI', JSON.stringify(localStorageInfo));
}

export function getLocalStore() {
  return JSON.parse(localStorage.getItem('BK$WEB$UI'));
}

export function getStoreItem(key: string) {
  if (!localStorageInfo) {
    return null;
  }
  let item = localStorageInfo[key];
  if (typeof item === 'object' && item !== null) {
    item = JSON.parse(JSON.stringify(item));
  }
  return { [key]: item };
}

export function removeStoreItem(key: string) {
  const Lx = { ...localStorageInfo };
  delete Lx[key];
  localStorageInfo = { ...Lx };
}

export function hydrateLocalStorage() {
  localStorageInfo = getLocalStore();
}

export function setAuthToken(token: string) {
  setStoreItem({ authToken: token });
}

export function getAuthToken() {
  const authToken = getStoreItem('authToken');
  return authToken && authToken['authToken'] ? authToken['authToken'] : null;
}

export function clearLocalStorage() {
  localStorage.clear();
  if (localStorageInfo) {
    localStorageInfo.authToken = null;
  }
}
