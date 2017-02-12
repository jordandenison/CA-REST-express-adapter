module.exports = { // TODO: move to options from API
  jwtSecret: process.env.JWT_SECRET || 'secret',
  ENV: process.env.NODE_ENV || 'development',
  unprotectedRoutes: ['/', '/robots.txt', '/user/login']
}
