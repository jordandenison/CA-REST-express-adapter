/**
 * External dependencies
 */
const bodyParser = require('body-parser')

/**
 * Internal dependencies
 */
const { serverExceptionHandler } = require('src/lib/errors')
const authorization = require('src/middleware/authorization')
const notFound = require('src/controllers/not-found')
const robots = require('src/controllers/robots')
const root = require('src/controllers/root')
const domainController = require('src/controllers/domain')

const getRegexp = /get/i

module.exports = {
  initMiddleware (app) {
    app.use(bodyParser.json())
    app.use(authorization.jwtCheck, authorization.getCurrentUser)
  },

  initCustomRoutes (app, customRoutes) {
    customRoutes.forEach(({ method, path, executor, useCase, port }) => {
      app[method](path, (req, res) => {
        executor[getRegexp.test(method) ? 'query' : 'run'](useCase, port(req, res))
      })
    })
  },

  initCrudRoutes ({ app, executor, domains, services, options }) {
    Object.keys(domains).forEach(domain => {
      app.get(`/${domain}`, domainController.getList(domain, executor, services[domain].getList))
      app.get('/comment/:id', domainController.getById(domain, executor, services[domain].getById))
      app.post('/comment', domainController.create(domain, executor, services[domain].create))
      app.put('/comment/:id', domainController.edit(domain, executor, services[domain].edit))
      app.delete('/comment/:id', domainController.remove(domain, executor, services[domain].remove))
    })
  },

  initStandardRoutes (app) {
    app.get('/', root)
    app.get('/robots.txt', robots)

    app.get('*', notFound)
    app.post('*', notFound)
    app.patch('*', notFound)
    app.delete('*', notFound)

    app.use(serverExceptionHandler)
  }
}
