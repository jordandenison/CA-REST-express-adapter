/**
 * External dependencies
 */
const test = require('ava')
const request = require('supertest')
const proxyquire = require('proxyquire')

/**
 * Internal dependencies
 */
proxyquire('./controllers', {
  'winston': {
    error: () => {}
  }
})

const port = 5000
const initOptions = {
  options: { port },
  domains: {},
  services: {},
  executor: {
    run: () => {},
    query: () => {}
  }
}

/**
 * SUT
 */
const server = proxyquire('./index', {
  'winston': {
    info: () => {},
    error: () => {}
  }
}).init(initOptions)

test('base route', t =>
  request(server)
    .get('/')
    .then(res => t.is(res.status, 200)))

test('robots route', t =>
  request(server)
    .get('/robots.txt')
    .then(res => t.is(res.status, 200)))
