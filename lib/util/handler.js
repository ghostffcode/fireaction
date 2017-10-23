'use strict' // eslint-disable-line

const handler = function (err, res) {
  if (err) {
    return Promise.reject(err)
  } else {
    return Promise.resolve(res)
  }
}

module.exports = handler
