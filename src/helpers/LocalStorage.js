export default class LocalStorage {
  static set(key, object) {
    localStorage.setItem(key, JSON.stringify(object));
  }

  static get(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return null;
    }
  }

  static remove(key) {
    localStorage.removeItem(key);
  }

  /** Cleans full storage for current session */
  static clear() {
    localStorage.clear();
  }
}