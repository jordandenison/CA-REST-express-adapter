/**
 * External dependencies
 */
const argon2 = require('argon2')
const Promise = require('bluebird')
const jwt = require('jsonwebtoken')
const winston = require('winston')

/**
 * Internal dependencies
 */
const { jwtSecret } = require('src/lib/config')
const { UnauthorizedError } = require('src/lib/errors')

Promise.promisifyAll(jwt)

module.exports = {
  generateToken ({ id, email }) {
    return Promise.try(() => {
      if (!id && !email) { throw new Error('id or email required') }

      return jwt.signAsync({ id, email }, jwtSecret, {})
    })
    .catch(e => {
      winston.error(`error generating token for user id ${id} email ${email}, ${e}`)
      throw e
    })
  },

  generatePasswordHash (passwordInput) {
    return argon2.generateSalt(32)
      .then(salt =>
        argon2.hash(passwordInput, salt)
          .then(password => ({ password, salt })))
  },

  verifyPassword (password, passwordInput) {
    return argon2.verify(password, passwordInput)
      .then(match => {
        if (!match) { throw new UnauthorizedError() }
      })
  }
}
