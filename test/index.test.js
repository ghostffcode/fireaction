/* global describe, it, before, after */

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const FirebaseServer = require('firebase-server')
const firebase = require('firebase')

const Firebaseaction = require('../lib')

chai.use(chaiAsPromised)

const expect = chai.expect

chai.should()

const sampleData = {
  sample: {
    src: {
      valid: true
    }
  }
}

const FireServer = new FirebaseServer(5000, '127.0.1', sampleData)

const config = {
  apiKey: 'fake-api-key-for-testing-purposes-only',
  databaseURL: 'ws://127.0.1:5000'
}

firebase.initializeApp(config)
const ref = firebase.database().ref()

const sampleRef = ref.child('/sample')
const src = 'src'
const dest = 'dest'

const fireaction = new Firebaseaction(sampleRef)

const resetDB = () => {
  return ref.remove()
     .then(() => ref.set(sampleData))
}

before(() => {
  console.log('******** Setup firebase server and started connection ********')
})

describe('Source', () => {
  it('should have an object', () => {
    return sampleRef.once('value')
       .then((snapShot) => snapShot.val())
       .should.eventually.be.an('object')
  })
})

describe('Destination', () => {
  it('should be null before copy or move fireaction', () => {
    sampleRef.child(dest).once('value')
       .then((snapShot) => snapShot.val())
       .should.eventually.equal(null)
  })
})

describe('Fireaction', () => {
  describe('#fireaction.copy(src, dest)', () => {
    it('should populate destination path with source data and key', () => {
      return fireaction.copy(src, dest)
        .then(() => sampleRef.child(dest).once('value'))
        .then((snapShot) => snapShot.val()[src])
        .should.eventually.deep.equal(sampleData.sample[src])
    })

    it('should not alter source data', () => {
      return sampleRef.child(src).once('value')
         .then((snapShot) => snapShot.val())
         .should.eventually.deep.equal(sampleData.sample[src])
    })
  })

  before(resetDB)

  describe('#fireaction.move(src, dest)', () => {
    it('should populate destination path with src data and key', () => {
      return fireaction.move(src, dest)
        .then(() => sampleRef.child(dest).once('value'))
        .then((snapShot) => snapShot.val()[src])
        .should.eventually.deep.equal(sampleData.sample[src])
    })

    it('should remove source data', function () {
      return sampleRef.child(src).once('value')
         .then((snapShot) => snapShot.val())
         .should.eventually.equal(null)
    })
  })

  before(resetDB)

  it('return value should have source key and value', () => {
    return expect(fireaction.copy(src, dest))
      .to.eventually.have.property(src)
  })
})

after(() => {
  FireServer.close(console.log('******** Firebase connection closed ********'))
})
