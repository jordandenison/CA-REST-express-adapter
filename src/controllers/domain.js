/**
 * External dependencies
 */
const { omit, upperFirst } = require('lodash/fp')

/**
 * Internal dependencies
 */
const { errorHandler } = require('../controllers')

module.exports = {
  getById (domain, executor, getById) {
    return (req, res) => {
      executor.query(`get${upperFirst(domain)}ById`, {
        currentUser: req.user,
        id: req.params.id,
        getById,
        respond: result => res.json({ result }),
        errorHandler: errorHandler(req, res)
      })
    }
  },

  getList (domain, executor, getList) {
    return (req, res) => {
      const currentUser = req.user
      const { page, limit } = req.query
      const options = { page, limit }
      const query = omit([ 'page', 'limit' ], req.query)

      executor.query(`get${upperFirst(domain)}List`, {
        currentUser,
        query,
        options,
        getList,
        respond: results => res.json({ results }),
        errorHandler: errorHandler(req, res)
      })
    }
  },

  create (domain, executor, create) {
    return (req, res) => {
      executor.run(`create${upperFirst(domain)}`, {
        currentUser: req.user,
        data: req.body,
        create,
        respond: result => res.status(201).json({ result }),
        errorHandler: errorHandler(req, res)
      })
    }
  },

  edit (domain, executor, edit) {
    return (req, res) => {
      executor.run(`edit${upperFirst(domain)}`, {
        currentUser: req.user,
        id: req.params.id,
        data: req.body,
        edit,
        respond: result => res.json({ result }),
        errorHandler: errorHandler(req, res)
      })
    }
  },

  remove (domain, executor, remove) {
    return (req, res) => {
      executor.run(`delete${upperFirst(domain)}`, {
        currentUser: req.user,
        id: req.params.id,
        remove,
        respond: () => res.sendStatus(204),
        errorHandler: errorHandler(req, res)
      })
    }
  }
}
