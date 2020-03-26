const usersCollection = require('../db').collection('users')

const Username = require('./user-data-elements/Username')
const Email = require('./user-data-elements/Email')
const Password = require('./user-data-elements/Password')

class User {

    constructor(data) {
        this.data = data
        this.errors = []
    }

    register() {
        this.cleanData()
        if (!this.errors.length) {
            usersCollection.insertOne(this.data)
        }
    }

    cleanData() {
        this.addUserElementsAndErrors(
            new Username(this.data.username),
            new Email(this.data.email),
            new Password(this.data.password))
    }

    addUserElementsAndErrors(...userDataElements) {
        this.data = {}
        userDataElements.forEach((userDataElement) => {
            this.errors = this.errors.concat(userDataElement.errors)
            this.data[userDataElement.name] = userDataElement.value
        })
    }
}

module.exports = User