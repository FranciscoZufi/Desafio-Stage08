const knex = require('../database/knex')

class TagsController {
  async index(request, response) {
    const { note_id, id, user_id } = request.params

    const tags = await knex('tags').where({ user_id })

    return response.json(tags)
  }
}

module.exports = TagsController
