class NoDataError extends Error {
  constructor(message) {
    super(message)
    this.name = 'NoDataError'
    this.message = message
  }
}
module.exports = NoDataError