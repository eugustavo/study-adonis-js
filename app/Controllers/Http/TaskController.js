'use strict';

const Task = use('App/Models/Task');

class TaskController {
  async index({ params }) {
    const tasks = await Task.query()
      .where('project_id', params.projects_id)
      .with('user', user => user.setVisible(['id', 'username', 'email']))
      .with('file', file => file.setVisible(['url']))
      .fetch();

    return tasks;
  }

  async show({ params, response }) {
    try {
      const task = await Task.findOrFail(params.id);

      await task.load('user', user =>
        user.setVisible(['id', 'username', 'email']),
      );
      await task.load('file', file => file.setVisible(['url']));

      return task;
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Task não encontrada!' } });
    }
  }

  async store({ request, params }) {
    const data = request.only([
      'user_id',
      'title',
      'description',
      'due_date',
      'file_id',
    ]);

    const task = await Task.create({ ...data, project_id: params.projects_id });

    return task;
  }

  async update({ params, request, response }) {
    try {
      const task = await Task.findOrFail(params.id);

      const data = request.only([
        'user_id',
        'title',
        'description',
        'due_date',
        'file_id',
      ]);

      task.merge(data);

      await task.save();

      return task;
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Não foi possível atualizar a Task' } });
    }
  }

  async destroy({ params, response }) {
    try {
      const task = await Task.findOrFail(params.id);

      await task.delete();
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Não foi possível deletar a Task' } });
    }
  }
}

module.exports = TaskController;
