const { StatusCodes } = require('http-status-codes')
const CustomAPIForError = require('./custom-api').default

class BadRequestError extends CustomAPIForError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}

module.exports = BadRequestError
