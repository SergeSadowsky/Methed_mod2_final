// eslint-disable-next-line require-jsdoc
const tdTaskEvent = (e) => {
  if (e.which === 13) {
    console.log(e.target);
    tdTaskEvent.tasks.updateTask(e.target.parentNode);
    e.target.removeEventListener('keypress', tdTaskEvent);
    e.target.blur();
  }
};

export const formEvents = (form, tasks) => {
  form.task.addEventListener('change', e => {
    form[1].disabled = !(e.target.value.length > 0);
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const task = Object.fromEntries(formData);
    tasks.addTask(task);
    form.reset();
    form[1].disabled = true;
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
