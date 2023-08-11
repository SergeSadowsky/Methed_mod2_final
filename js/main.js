import * as rn from './modules/render.js';
import * as taskObj from './modules/taskObj.js';
import * as storServ from './modules/storageService.js';
import {formEvents, tableEvents} from './modules/events.js';

const todoApp = (function() {
  const init = (selector) => {
    let name = '';
    while (name.length === 0) {
      name = prompt('Ваше имя? ');
    }
    const {form, table} = rn.renderApp(selector);
    const storage = storServ.init(name);
    const tasks = taskObj.init(storage, table);
    formEvents(form, tasks);
    tableEvents(table, tasks);
  };

  return {init};
})();

document.addEventListener('DOMContentLoaded', () => {
  todoApp.init('.app-container');
});
