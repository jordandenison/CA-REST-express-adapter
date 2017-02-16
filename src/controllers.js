/**
 * External dependencies
 */
const winston = require('winston')

/**
 * Internal dependencies
 */
const { BadRequestError, NotFoundError } = require('./lib/errors')

const notFoundRegexp = /not found/

module.exports = {
  errorHandler: (req, res) => e => { // TODO: refactor/clean up
    let status = 500

    if (e instanceof BadRequestError) {
      status = 400
    } else if (e instanceof NotFoundError || e.message === 'model not found' || notFoundRegexp.test(e.message)) {
      status = 404
    }

    winston.error(`http error: ${e.stack}`)

    if (status === 400) {
      return res.status(status).end(JSON.stringify({ error: e.message }))
    } else {
      try {
        const message = JSON.stringify(JSON.parse(e.message))
        return res.status(422).end(message)
      } catch (_) {
        return res.status(status).end(status === 500 ? e.stack : '')
      }
    }
  }
}
