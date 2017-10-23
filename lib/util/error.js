'use strict' // eslint-disable-line

function error (name, description) {
  const err = new Error(description)
  err.name = name
  return err
}

module.exports = error
