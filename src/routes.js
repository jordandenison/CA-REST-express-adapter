/**
 * External dependencies
 */
const bodyParser = require('body-parser')

/**
 * Internal dependencies
 */
const { serverExceptionHandler } = require('./lib/errors')
const authorization = require('./middleware/authorization')
const notFound = require('./controllers/not-found')
const robots = require('./controllers/robots')
const root = require('./controllers/root')
const domainController = require('./controllers/domain')

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
