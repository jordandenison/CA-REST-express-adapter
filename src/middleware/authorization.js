/**
 * External dependencies
 */
const jwt = require('express-jwt')

/**
 * Internal dependencies
 */
const { jwtSecret: secret, unprotectedRoutes } = require('src/lib/config')

module.exports = {
  jwtCheck:
    jwt({ credentialsRequired: true, secret })
      .unless({ path: unprotectedRoutes }),

  getCurrentUser: (req, res, next) => {
    next()
  }
}
