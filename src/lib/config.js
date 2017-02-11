module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'secret',
  ENV: process.env.NODE_ENV || 'development',
  unprotectedRoutes: ['/', '/robots.txt', '/user/login']
}
