/**
 * External dependencies
 */
const jwt = require('express-jwt')

module.exports = {
  jwtCheck ({ jwtSecret, unprotectedRoutes }) {
   return jwt({ credentialsRequired: true, secret: jwtSecret })
      .unless({ path: unprotectedRoutes })
  },

  getCurrentUser (req, res, next) {
    next()
  }
}
