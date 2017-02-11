/**
 * External dependencies
 */
const { omit, upperFirst } = require('lodash/fp')

/**
 * Internal dependencies
 */
const { errorHandler } = require('src/controllers')

module.exports = {
  getInfo (domain, executor, getById) {
    return (req, res) => {
      const { id } = req.params

      executor.query(`get${upperFirst(domain)}ById`, {
        id,
        getById,
        respond: result => res.json({ result }),
        errorHandler: errorHandler(req, res)
      })
    }
  },

  getList (domain, executor, getList) {
    return (req, res) => {
      const { page, limit } = req.query
      const options = { page, limit }
      const query = omit([ 'page', 'limit' ], req.query)

      executor.query(`get${upperFirst(domain)}List`, {
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
        currentUser: req.user.id,
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
        id: req.params,
        remove,
        respond: () => res.sendStatus(204),
        errorHandler: errorHandler(req, res)
      })
    }
  }
}
