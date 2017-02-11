module.exports = function robotsRoute (req, res) {
  res.type('text/plain')
  res.send(`User-agent: *\nDisallow:${process.env.ROBOTS_INDEX === 'true' ? ' /' : ''}\n`)
}
