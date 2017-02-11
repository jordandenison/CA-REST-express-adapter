require('app-module-path').addPath(__dirname) // eslint-disable-line

/**
 * External dependencies
 */
const Express = require('express')
const { Server } = require('http')
const winston = require('winston')

/**
 * Internal dependencies
 */
const routes = require('src/routes')

const app = new Express()
app.disable('x-powered-by')

const customRoutes = []

module.exports = {
  addCustomRoute ({ method, path, executor, useCase, port }) {
    customRoutes.push({ method, path, executor, useCase, port })
  },

  init ({ executor, domains, services, options }) {
    routes.initMiddleware(app)
    routes.initCrudRoutes({ app, executor, domains, services, options })
    routes.initCustomRoutes(app, customRoutes)
    routes.initStandardRoutes(app)

    const server = new Server(app)
    server.listen(options.port, e => {
      if (e) { return winston.info(`error listening on port ${options.port}, :${e}`) }

      winston.info(`STATS Coach API listening on port ${options.port}!`)
    })

    return server
  }
}
