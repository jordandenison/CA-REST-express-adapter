/**
 * External dependencies
 */
const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

/**
 * Stubs
 */
const errorStub = sinon.stub()

/**
 * SUT
 */
const errors = proxyquire('./errors', {
  'winston': {
    error: errorStub
  }
})

const captureStackTrace = Error.captureStackTrace

test.beforeEach(() => errorStub.reset())

test('after', () => { Error.captureStackTrace = captureStackTrace })

test('onPossiblyUnhandledRejection', t => {
  const error = 'test error message'
  errors.onPossiblyUnhandledRejection(error)
  t.true(errorStub.args[0][0].indexOf(error) !== -1, 'logs error message to console')
})

test('serverExceptionHandler', t => {
  t.plan(2)

  const endStub = sinon.stub()
  const statusStub = sinon.stub().returns({ end: endStub })
  const error = 'test error message'
  errors.serverExceptionHandler(error, null, { status: statusStub })
  t.is(statusStub.args[0][0], 500, 'responds with 500 status code')
  t.true(errorStub.args[0][0].indexOf(error) !== -1, 'logs error message to console')
})

test('uncaughtExceptionHandler', t => {
  t.plan(2)

  const exitStub = sinon.stub()
  process.exit = exitStub
  const error = 'test error message'
  errors.uncaughtExceptionHandler(error)
  t.is(exitStub.args[0][0], 1, 'exits with code 1')
  t.true(errorStub.args[0][0].indexOf(error) !== -1, 'logs error message to console')
})

test('custom not found error', t => {
  t.throws(() => { throw new errors.NotFoundError('item not found') }, 'item not found')
})

test('custom not found error default message', t => {
  t.throws(() => { throw new errors.NotFoundError() }, 'not found')
})

test('custom not found error when Error does not have captureStackTrace defined', t => {
  delete Error.captureStackTrace
  t.throws(() => { throw new errors.NotFoundError('not found') }, 'not found')
})
