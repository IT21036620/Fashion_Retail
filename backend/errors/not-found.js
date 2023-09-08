const { StatusCodes } = require('http-status-codes')
const CustomAPIForError = require('./custom-api').default

class NotFoundError extends CustomAPIForError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.NOT_FOUND
  }
}

module.exports = NotFoundError
