const knex = require('../database/knex')
// const { hash, compare } = require('bcryptjs')
// const AppError = require('../utils/AppError')

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body

    const id = await knex('users').insert({
      name,
      email,
      password
    })
    await knex('users').insert(id)

    //   const checkUserExist = await database.get(table.text('email'), [email])

    //   if (checkUserExist) {
    //     throw new AppError('this email is already in use')
    //   }
    //   const hashedPassword = await hash(password, 8)
    //   await users.insert(
    //     {
    //       name,
    //       email,
    //       password
    //     }[(name, email, hashedPassword)]
    //   )

    //   return response.json()
    // }

    // async update(request, response) {
    //   const { name, email, password, old_password } = request.body
    //   const { id } = request.params

    //   const database = await knex()
    //   const user = await database.get(table.increments('id'), [id])

    //   if (!user) {
    //     throw new AppError('User not found')
    //   }

    //   const userWithUpdatedEmail = await database.get(table.text('email'), [
    //     email
    //   ])
    //   if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
    //     throw new AppError('this email is already in use')
    //   }
    //   user.name = name ?? user.name
    //   user.email = email ?? user.email

    //   if (password && !old_password) {
    //     throw new AppError(
    //       'you need to enter the old password to set the new password!'
    //     )
    //   }

    //   if (password && old_password) {
    //     const checkOldPassword = await compare(old_password, user.password)
    //     if (!checkOldPassword) {
    //       throw new AppError('password does not match')
    //     }
    //     user.password = await hash(password, 8)
    //   }

    //   await database.run(
    //     table.increments('id'),
    //     table.text('name'),
    //     table.text('email'),
    //     table.text('password'),
    //     table.text('avatar'),
    //     table.timestamp('updated_at').default(knex.fn.now()),
    //     [user.name, user.email, user.password, id]
    //   )
    return response.json()
  }
}

module.exports = UsersController
