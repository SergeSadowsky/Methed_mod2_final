// eslint-disable-next-line require-jsdoc
const tdTaskEvent = (e) => {
  if (e.which === 13) {
    tdTaskEvent.tasks.updateTask(e.target.parentNode);
    e.target.removeEventListener('keypress', tdTaskEvent);
    e.target.blur();
    e.target.contentEditable = false;
  }
};

export const modalEvents = (modal, selector, start) => {
  const btnOk = modal.querySelector('#Ok');
  const userNameInput = modal.querySelector('#userName');
  userNameInput.addEventListener('change', e => {
    btnOk.disabled = !(e.target.value.length > 0);
  });

  btnOk.addEventListener('click', e => {
    const user = userNameInput.value;
    modal.closeModal();
    start(selector, user);
  });
};

export const formEvents = (form, tasks) => {
  const btnSubmit = form[2];
  form.task.addEventListener('change', e => {
    btnSubmit.disabled = !(e.target.value.length > 0);
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const task = Object.fromEntries(formData);
    tasks.addTask(task);
    form.reset();
    btnSubmit.disabled = true;
  });
};

export const tableEvents = (table, tasks) => {
  table.tbody.addEventListener('click', e => {
    if (e.target.closest('.btn-danger')) {
      if (confirm('Действительно хотите удалить задачу?')) {
        tasks.removeTask(e.target.closest('tr'));
      }
    }
    if (e.target.closest('.btn-success')) {
      tasks.finishTask(e.target.closest('tr'));
    }
    if (e.target.closest('.btn-primary')) {
      const td = e.target.closest('tr').children[1];
      td.contentEditable = true;
      tdTaskEvent.tasks = tasks;
      td.addEventListener('keypress', tdTaskEvent);
      td.focus();
    }
  });
};
