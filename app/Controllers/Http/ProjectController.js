'use strict';

const Project = use('App/Models/Project');

class ProjectController {
  async index() {
    const projects = await Project.query()
      .with('user', user => user.setVisible(['id', 'username', 'email']))
      .fetch();

    return projects;
  }

  async show({ params }) {
    const project = await Project.findOrFail(params.id);

    await project.load('user', user =>
      user.setVisible(['id', 'username', 'email']),
    );
    await project.load('tasks');

    return project;
  }

  async store({ request, auth }) {
    const data = request.only(['title', 'description']);

    const project = await Project.create({ ...data, user_id: auth.user.id });

    return project;
  }

  async update({ params, request, response }) {
    try {
      const project = await Project.findOrFail(params.id);

      const data = request.only(['title', 'description']);
      project.merge(data);

      await project.save();

      return project;
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Não foi possível atualizar o projeto' } });
    }
  }

  async destroy({ params, response }) {
    try {
      const project = await Project.findOrFail(params.id);

      await project.delete();
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Não foi possível deletar o projeto' } });
    }
  }
}

module.exports = ProjectController;
