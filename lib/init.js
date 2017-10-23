'use strict' // eslint-disable-line

const defaultHandler = require('./util/handler')
const error = require('./util/error')

/**
 * [description]
 * @param  {String}   src      [firebase path for copy source]
 * @param  {String}   dest     [firebase path copy destination]
 * @param  {Object}   options  [configuration for copying method]
 * @param  {Function} callback [callback function for async copy requests]
 * @return {Promise}            [given callback if any else resolved promise]
 */
function init (src, dest, options, callback, move) {
  if (typeof options === 'function' && !callback) {
    callback = options
    options = {}
  }
  var noCallback = false
  if (!callback) noCallback = true
  callback = callback || defaultHandler
  options = options || { withKey: true, override: false }

  // validate src and destination
  if (typeof src !== 'string') return callback(error('srcType', 'source path must be a string'))
  if (typeof dest !== 'string') return callback(error('destType', 'destination path must be a string'))

  // remove trailing slashes from src path
  src = src.replace(/^[/]+/gi, '').replace(/[/]+$/gi, '')
  dest = dest.replace(/^[/]+/gi, '').replace(/[/]+$/gi, '')

  // make sure source and destination are not the same
  if (src === dest) return callback(error('samePath', 'source and destination must not be the same'))
  // perform copy actions
  var srcData = {}
  const self = this
  // get the data from src path
  const responsePromise = this._getFireData(src)
      // validate and copy to dest path
      .then(function (copiedData) {
        srcData = copiedData
        if (copiedData.value === null) {
          throw error('nullSrc', 'Source path value must not be null')
        }
        return self._paste(srcData, dest, options)
      })
      // remove from src path if method called is move
      .then(function () {
        if (move) self._remove(src)
      })
      // setup response data and return via callback
      .then(function () {
        var returnData = srcData.value
        if (options.withKey) {
          returnData = {}
          returnData[srcData.key] = srcData.value
        }
        return callback(null, returnData)
      })
      .catch(function (err) {
        if (noCallback) {
          throw err
        } else {
          return callback(err)
        }
      })

  return responsePromise
}

module.exports = init
