/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from './kernel.js'
import router from '@adonisjs/core/services/router'

const usersController = () => import("#controllers/users_controller")

router.group(() => {
  router.get('/', ({ response }) => { response.status(200).send("Projeto Modelo") }),

  router.group(() => {
    router.post('/', [usersController, 'create']),
    router.put('/', [usersController, 'update']).use(middleware.auth({ guards: ['api'] })),
    router.get('/list', [usersController, 'list']).use(middleware.auth({ guards: ['api'] })),
    router.get('/:id', [usersController, 'get']).use(middleware.auth({ guards: ['api'] })),
    router.delete('/:id', [usersController, 'delete']).use(middleware.auth({ guards: ['api'] })),
    router.post('/login', [usersController, 'login'])
  })
  .prefix('/users')
})
.prefix('/api')