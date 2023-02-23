const NoDataError = require('../middleware/nodata_error')
module.exports = {
  generalErrorHandler: (err, req, res, next) => {
    if (err instanceof NoDataError) {
      req.flash('err_msg', `${err.name}: ${err.message}`)
    } else if (err instanceof Error) {
      req.flash('err_msg', `${err.name}: ${err.message}`)
    } else {
      req.flash('err_msg', `${err}`)
    }
    res.redirect('back')
    next(err)
  }
}