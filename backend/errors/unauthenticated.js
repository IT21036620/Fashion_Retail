const { StatusCodes } = require('http-status-codes')
const CustomAPIForError = require('./custom-api').default

class UnauthenticatedError extends CustomAPIForError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}

module.exports = UnauthenticatedError
