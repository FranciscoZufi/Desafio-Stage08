const knex = require('../database/knex')
const { hash, compare } = require('bcryptjs')
const AppError = require('../utils/AppError')

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body

    const checkUserExist = await knex('users').where({ email })
    console.log({ checkUserExist })

    if (checkUserExist[0]) {
      throw new AppError('this email is already in use')
    }
    const hashedPassword = await hash(password, 8)
    console.log({ hashedPassword })
    const user = await knex('users').insert({
      name,
      email,
      password: hashedPassword
    })

    return response.json({ userName: name, email })
  }

  async update(request, response) {
    const { name, email, avatar, updated_at, password, old_password } =
      request.body
    const { id } = request.params

    const user = await knex('users').where({ id })

    if (!user[0]) {
      throw new AppError('User not found')
    }

    const userWithUpdatedEmail = await knex('users').where({ email })
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('this email is already in use')
    }
    user.name = name ?? user.name
    user.email = email ?? user.email

    if (password && !old_password) {
      throw new AppError(
        'you need to enter the old password to set the new password!'
      )
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user[0].password)
      if (!checkOldPassword) {
        throw new AppError('password does not match')
      }
      // const hashedPassword = await hash(password, 8)
    }

    await knex('users')
      .where({ id: id })
      .update({
        name,
        email,
        avatar,
        password: hash(password, 8),
        updated_at: knex.fn.now()
      })
    return response.json()
  }
}

module.exports = UsersController
