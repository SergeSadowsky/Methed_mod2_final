
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
      tasks.removeTask(e.target.closest('tr'));
    }
    if (e.target.closest('.btn-success')) {
      tasks.finishTask(e.target.closest('tr'));
    }
  });
};
