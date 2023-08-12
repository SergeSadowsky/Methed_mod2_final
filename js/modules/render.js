import {STATUS} from './constants.js';

const createHeader = (name) => {
  const header = document.createElement('h3');
  header.textContent = `Todo App: ${name}`;
  return header;
};

const renderForm = () => {
  const form = document.createElement('form');
  form.className = 'd-flex align-items-center mb-3';

  form.insertAdjacentHTML('beforeend', `
    <label class="form-group me-3 mb-0">
    <input type="text" class="form-control" placeholder="ввести задачу"
    name="task" id="task" required />
    </label>

    <label class="form-group me-3 mb-0">
    <select class="form-select" name="priority" id="priority" required>
        <option value="" selected>Важность задачи...</option>
        <option value="table-light">Обычная</option>
        <option value="table-warning">Важная</option>
        <option value="table-danger">Срочная</option>
    </select>
    </label>

    <button type="submit" class="btn btn-primary me-3" disabled>
    Сохранить
    </button>

    <button type="reset" class="btn btn-warning">
    Очистить
    </button>
  `);

  return form;
};

const createRowBtns = (params) => {
  const btns = params.map(({className, text}) => {
    const button = document.createElement('button');
    button.className = className;
    button.textContent = text;
    return button;
  });

  return btns;
};

// eslint-disable-next-line require-jsdoc
function createRow(num, {id, task, status, priority}) {
  const tr = document.createElement('tr');
  if (priority) {
    tr.classList.add(priority);
  } else {
    tr.classList.add('table-light');
  }
  // tr.classList.add('table-light');
  // tr.classList.add(priority);

  tr.dataset.id = id;

  const tdNum = document.createElement('td');
  tdNum.textContent = num;

  const tdTask = document.createElement('td');
  tdTask.textContent = task;

  const tdStatus = document.createElement('td');
  tdStatus.textContent = status;

  const btns = createRowBtns([
    {
      className: 'btn btn-danger me-3',
      text: 'Удалить',
    },
    {
      className: 'btn btn-success me-3',
      text: 'Завершить',
    },
    {
      className: 'btn btn-primary',
      text: 'Редактировать',
    },
  ]);

  if (status === STATUS.Finished) {
    tr.className = '';
    tr.classList.add('table-success');
    tdTask.classList.add('text-decoration-line-through');
    btns[1].disabled = true;
  }

  const tdBtns = document.createElement('td');
  tdBtns.append(...btns);

  tr.append(tdNum, tdTask, tdStatus, tdBtns);
  // eslint-disable-next-line no-invalid-this
  this.tbody.append(tr);
  return tr;
}

// eslint-disable-next-line require-jsdoc
function reCount() {
  let i = 0;
  // eslint-disable-next-line no-invalid-this
  const rows = this.tbody.childNodes;
  rows.forEach(row => {
    const td = row.children[0];
    td.textContent = ++i;
  });
}

// eslint-disable-next-line require-jsdoc
function setRowSuccess(row) {
  row.className = '';
  row.classList.add('table-success');
  row.children[1].classList.add('text-decoration-line-through');
  row.children[3].children[1].disabled = true;
}

const renderTable = () => {
  const table = document.createElement('table');
  table.className = 'table table-hover table-bordered';

  const thead = document.createElement('thead');
  thead.insertAdjacentHTML('beforeend', `
    <tr>
        <th>№</th>
        <th>Задача</th>
        <th>Статус</th>
        <th>Действия</th>
    </tr>
    `);

  const tbody = document.createElement('tbody');
  table.append(thead, tbody);
  table.thead = thead;
  table.tbody = tbody;
  return table;
};

const createModal = () => {
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade');
  modal.id = 'myModal';
  modal.tabIndex = -1;
  modal.insertAdjacentHTML('beforeend', `
  
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Ваше имя: </h5>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <input type="text" class="form-control" id="userName" name="userName">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button id="Ok" type="button" class="btn btn-primary" disabled>ОK</button>
      </div>
    </div>
  </div>

  `);
  return modal;
};

// eslint-disable-next-line require-jsdoc
function openModal() {
  // eslint-disable-next-line no-invalid-this
  this.classList.add('show');
  // eslint-disable-next-line no-invalid-this
  this.style.display = 'block';
}

// eslint-disable-next-line require-jsdoc
function closeModal() {
  // eslint-disable-next-line no-invalid-this
  this.classList.remove('show');
  // eslint-disable-next-line no-invalid-this
  this.style.display = 'none';
}

const renderModal = (selector) => {
  const app = document.querySelector(selector);
  const modal = createModal();

  modal.openModal = openModal.bind(modal);
  modal.closeModal = closeModal.bind(modal);

  app.append(modal);
  return modal;
};

const renderApp = (selector, name) => {
  const app = document.querySelector(selector);
  app.classList.add('vh-100', 'w-100', 'd-flex',
      'align-items-center', 'justify-content-center', 'flex-column');

  const header = createHeader(name);
  const form = renderForm();
  const table = renderTable();

  table.createRow = createRow.bind(table);
  table.reCount = reCount.bind(table);
  table.setRowSuccess = setRowSuccess;

  const tWrapper = document.createElement('div');
  tWrapper.classList.add('table-wrapper');
  tWrapper.append(table);

  app.append(header, form, tWrapper);
  return {form, table};
};

export {renderApp, renderModal};

