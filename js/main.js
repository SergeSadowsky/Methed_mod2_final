import * as rn from './modules/render.js';
import * as taskObj from './modules/taskObj.js';
import * as storServ from './modules/storageService.js';
import {formEvents, tableEvents, modalEvents} from './modules/events.js';

const todoApp = (function() {
  const start = (selector, name) => {
    const {form, table} = rn.renderApp(selector, name);
    const storage = storServ.init(name);
    const tasks = taskObj.init(storage, table);
    formEvents(form, tasks);
    tableEvents(table, tasks);
  };

  const init = (selector) => {
    const modal = rn.renderModal(selector);
    modalEvents(modal, selector, start);
    modal.openModal();
  };

  return {init};
})();

document.addEventListener('DOMContentLoaded', () => {
  todoApp.init('.app-container');
});
