/**
 * External dependencies
 */
const test = require('ava')
// const { assign, times } = require('lodash')
// const request = require('supertest')
const proxyquire = require('proxyquire')
// const { all } = require('bluebird')

/**
 * Internal dependencies
 */
proxyquire('..//controllers', {
  'winston': {
    error: () => {}
  }
})

const currentUser = 'testuuid'
proxyquire('../routes', {
  './middleware/authorization': {
    jwtCheck: (req, res, next) => {
      req.user = { id: currentUser }
      next()
    },
    getCurrentUser: (req, res, next) => next()
  }
})

/**
 * SUT
 */
// const server = proxyquire('index', {
//   'src/lib/config': {
//     PORT: 3010
//   },
//   'winston': {
//     error: () => {}
//   }
// })

test('TODO: load sample domain object to test', t => t.pass())

// const sampleData = { text: 'some comment', resourceId: 'some-test-resourceId-uuid', type: 'comment' }

// const createTestComment = resourceId =>
//   request(server)
//     .post('/comment')
//     .send(resourceId ? assign(sampleData, { resourceId }) : sampleData)
//     .then(res => res.body.result)

// test('comment route: responds 201 when a comment has been created', t =>
//   request(server)
//     .post('/comment')
//     .send({ text: 'some comment', resourceId: 'some-test-resourceId-uuid', type: 'comment' })
//     .then(res => {
//       t.is(res.status, 201)
//       t.is(res.body.result.text, 'some comment')
//       t.truthy(res.body.result.type)
//       t.truthy(res.body.result.resourceId)
//       t.truthy(res.body.result.createdBy)
//       t.truthy(res.body.result.createdAt)
//       t.truthy(res.body.result.updatedAt)
//       t.truthy(res.body.result.id)
//       t.true(res.body.result.active)
//     }))

// test('comment route: responds 204 when a comment is deleted and 404 when fetched again', t =>
//   createTestComment()
//     .then(comment =>
//       request(server)
//         .delete(`/comment/${comment.id}`)
//         .then(res => t.is(res.status, 204))
//         .then(() =>
//           request(server)
//             .get(`/comment/${comment.id}`)
//             .then(res => t.is(res.status, 404)))))

// test('comment route: responds 404 when a comment is not deleted', t =>
//   request(server)
//     .delete(`/comment/non-existing`)
//     .then(res => t.is(res.status, 404)))

// test('comment route: responds 422 when a comment has not been created', t =>
//   request(server)
//     .post('/comment')
//     .send({})
//     .then(res => t.is(res.status, 422)))

// test('comment route: responds 200 when getting the comment list', t =>
//   all(times(8, () => createTestComment()))
//     .then(res2 =>
//       request(server)
//         .get(`/comment?limit=2`)
//         .then(res => {
//           t.is(res.status, 200)
//           t.is(res.body.records.length, 2)
//           t.true(res.body.total >= 2)
//         })
//     ))

// test('comment route: responds 200 when getting the comment list for a specific user', t =>
//   all(times(8, () => createTestComment()))
//     .then(res2 =>
//       request(server)
//         .get(`/comment?limit=2&user=${currentUser}`)
//         .then(res => {
//           t.is(res.status, 200)
//           t.is(res.body.records.length, 2)
//           t.true(res.body.total >= 2)
//         })
//     ))

// test('comment route: responds 200 when getting the comment list for a specific resource', t =>
//   all([
//     createTestComment('resource1'),
//     createTestComment('resource1'),
//     createTestComment('resource2'),
//     createTestComment('resource2'),
//     createTestComment('resource2'),
//     createTestComment('resource3'),
//     createTestComment()
//   ])
//     .then(res2 =>
//       request(server)
//         .get(`/comment?limit=2&resourceId=resource1`)
//         .then(res => {
//           t.is(res.status, 200)
//           t.is(res.body.records.length, 2)
//           t.true(res.body.total >= 2)
//         })
//     ))

// test('comment route: responds 200 when getting an existing comment', t =>
//   createTestComment()
//     .then(comment =>
//       request(server)
//         .get(`/comment/${comment.id}`)
//         .then(res => {
//           t.is(res.status, 200)
//           t.deepEqual(res.body.result, comment)
//         })
//     ))

// test('comment route: responds 404 when getting a nonexisting comment', t =>
//   request(server)
//     .get('/comment/nonexisting')
//     .then(res => t.is(res.status, 404)))

// test('comment route: responds 200 when editing an existing comment', t =>
//   createTestComment()
//     .then(comment =>
//       request(server)
//         .put(`/comment/${comment.id}`)
//         .send({ text: 'another text' })
//         .then(res => {
//           t.is(res.status, 200)
//           t.is(res.body.result.text, 'another text')
//           t.is(res.body.result.id, comment.id)
//         })
//     )
// )

// test('comment route: responds 404 when editing a nonexisting comment', t =>
//   request(server)
//     .put('/comment/some-id')
//     .send({ text: 'another title' })
//     .then(res => t.is(res.status, 404))
// )

// test('comment route: responds 422 when editing nothing valid', t =>
//   createTestComment()
//     .then(comment =>
//       request(server)
//         .put(`/comment/${comment.id}`)
//         .send({ text: true })
//         .then(res => {
//           t.is(res.status, 422)
//           t.is(JSON.parse(res.text).text, 'must be a string')
//         })
//   )
// )
