/**
 * External dependencies
 */
const winston = require('winston')
const { StatusCodeError } = require('request-promise-core/errors')

/**
 * Internal dependencies
 */
const { BadRequestError, NotFoundError } = require('src/lib/errors')

module.exports = {
  errorHandler: (req, res) => e => { // TODO: refactor/clean up
    let status = 500

    if (e instanceof BadRequestError) {
      status = 400
    } else if (e instanceof NotFoundError) {
      status = 404
    } else if (e instanceof StatusCodeError) {
      status = e.statusCode
    }

    winston.error(`http error: ${e.stack}`)

    if (status === 400) {
      return res.status(status).end(JSON.stringify({ error: e.message }))
    } else {
      try {
        const message = JSON.stringify(JSON.parse(e.message))
        return res.status(422).end(message)
      } catch (e) {
        return res.sendStatus(status)
      }
    }
  }
}
