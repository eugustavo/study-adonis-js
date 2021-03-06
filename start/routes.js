'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.post('sessions', 'SessionController.store');

Route.post('users', 'UserController.store');

Route.post('forgot-passwords', 'ForgotPasswordController.store');
Route.put('forgot-passwords', 'ForgotPasswordController.update');

Route.get('files/:id', 'FileController.show');

Route.group(() => {
  Route.post('files', 'FileController.store');

  Route.resource('projects', 'ProjectController').apiOnly();
  Route.resource('projects.tasks', 'TaskController').apiOnly();
}).middleware(['auth']);
