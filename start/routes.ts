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

const interpretaionsController = () => import("#controllers/interpretations_controller")
const accessesController = () => import("#controllers/accesses_controller")

router.group(() => {
  router.get('/', ({ response }) => { response.status(200).send("Morfeus IA Integration") }),

  router.group(() => {
    router.post('/', [interpretaionsController, 'create'])
    router.get('/:id', [interpretaionsController, 'get'])
    router.get('/list', [interpretaionsController, 'list'])
  })
    .prefix('/interpretation')
    .use(middleware.auth())

  router.group(() => {
    router.post('/direct_access', [accessesController, 'direct'])
    router.post('/morfeus_access', [accessesController, 'morfeus'])
  })
    .prefix('/accesses')
})
.prefix('/api')