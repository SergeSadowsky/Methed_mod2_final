export const modalEvents = (modal, selector, start) => {
  const form = modal.querySelector('form');
  const btnOk = form.querySelector('#btnOk');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const user = form.userName.value;
    modal.closeModal();
    start(selector, user);
  });

  form.userName.addEventListener('input', e => {
    btnOk.disabled = !(e.target.value.length > 0);
  });
};

export const formEvents = (form, tasks) => {
  const btnSubmit = form[2];

  form.task.addEventListener('input', e => {
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
      const tr = e.target.closest('tr');
      if (tr.classList.contains('table-success')) {
        tasks.restoreTask(tr);
        e.target.textContent = 'Завершить';
      } else {
        tasks.finishTask(tr);
        e.target.textContent = 'Возобновить';
      }
    }
    if (e.target.closest('.btn-primary')) {
      const td = e.target.closest('tr').children[1];
      if (td.contentEditable === 'true') {
        e.target.textContent = 'Редактировать';
        tasks.updateTask(e.target.closest('tr'));
        td.blur();
        td.contentEditable = false;
      } else {
        e.target.textContent = 'Сохранить';
        td.contentEditable = true;
        td.focus();
      }
    }
  });
};
