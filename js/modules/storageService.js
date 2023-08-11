/* eslint-disable require-jsdoc */

class Storage {
  /**
   * Конструктор
   * @constructor
   * @param {string} key - ключ для доступа к localStorage
  */
  constructor(key) {
    this._key = key;
  }

  //
  getStorage = () => JSON.parse(localStorage.getItem(this._key)) || [];

  getStorageById = (id) => {
    const data = JSON.parse(localStorage.getItem(this._key)) || [];
    const index = data.findIndex(el => el['id'] === id);
    return data[index];
  };

  //
  setStorage(record) {
    const data = JSON.parse(localStorage.getItem(this._key)) || [];
    data.push(record);
    localStorage.setItem(this._key, JSON.stringify(data));
  }

  //
  removeStorage(id) {
    const data = JSON.parse(localStorage.getItem(this._key)) || [];
    const index = data.findIndex(el => el['id'] === id);
    data.splice(index, 1);
    localStorage.setItem(this._key, JSON.stringify(data));
  }

  editStorage(id, record) {
    const data = JSON.parse(localStorage.getItem(this._key)) || [];
    const index = data.findIndex(el => el['id'] === id);
    data[index] = record;
    localStorage.setItem(this._key, JSON.stringify(data));
  }
}

export const init = (key) => new Storage(key);
