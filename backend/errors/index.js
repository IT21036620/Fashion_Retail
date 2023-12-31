const CustomAPIForError = require('./custom-api').default
const UnauthenticatedError = require('./unauthenticated')
const NotFoundError = require('./not-found')
const BadRequestError = require('./bad-request')

module.exports = {
  CustomAPIForError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
}
