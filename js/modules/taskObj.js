/* eslint-disable require-jsdoc */
import {STATUS} from './constants.js';

class TaskObj {
  constructor(storage, table) {
    this._storage = storage;
    this._table = table;
    this._loadTasks();
  }

  _loadTasks() {
    const data = this._storage.getStorage();
    let i = 0;
    data.forEach(record => {
      this._table.createRow(++i, record);
    });
  }

  addTask(data) {
    if (data) {
      const record = {
        id: this._createId(),
        task: data.task,
        status: STATUS.InProcess,
      };
      const quantity = this._table.tbody.children.length;
      this._table.createRow(quantity + 1, record);
      this._storage.setStorage(record);
    }
  }

  removeTask(row) {
    if (row) {
      const id = row.dataset.id;
      this._storage.removeStorage(id);
      row.remove();
      this._table.reCount();
    }
  }

  finishTask(row) {
    const id = row.dataset.id;
    const record = this._storage.getStorageById(id);
    if (record) {
      record.status = STATUS.Finished;
      this._table.setRowSuccess(row);
      this._storage.editStorage(id, record);
    }
  }
}

export const init = (storage, table) => new TaskObj(storage, table);
