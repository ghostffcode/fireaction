'use strict' // eslint-disable-line

const Fireaction = function (ref) {
  this.ref = ref
}

Fireaction.prototype._getFireData = function (src) {
  return this.ref.child(src).once('value').then(function (srcSnap) {
    return {
      value: srcSnap.val(),
      key: srcSnap.key
    }
  })
}

Fireaction.prototype._paste = function (srcData, dest, options) {
  dest = (options.withKey) ? dest + '/' + srcData.key : dest
  const destRef = this.ref.child(dest)
  const dataIsObject = (typeof srcData.value === 'object')
  if (options.override || !dataIsObject) {
    return destRef.set(srcData.value)
  } else {
    return destRef.update(srcData.value)
  }
}

Fireaction.prototype._remove = function (src) {
  return this.ref.child(src).remove()
}

Fireaction.prototype._init = require('./init')

Fireaction.prototype.copy = function (src, dest, options, callback) {
  return this._init(src, dest, options, callback)
}

Fireaction.prototype.move = function (src, dest, options, callback) {
  return this._init(src, dest, options, callback, true)
}

if (typeof window !== 'undefined') {
  window.Fireaction = Fireaction
} else {
  module.exports = Fireaction
}
// if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
//   module.exports = Fireaction
//   console.log(module, module.exports)
// } else {
//   console.log('Added to window');
// }
