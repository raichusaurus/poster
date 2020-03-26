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
        this.data = {
            username: this.getElementValueAndAddErrors(new Username(this.data.username)),
            email: this.getElementValueAndAddErrors(new Email(this.data.email)),
            password: this.getElementValueAndAddErrors(new Password(this.data.password))
        }
    }

    getElementValueAndAddErrors(userDataElement) {
        this.errors = this.errors.concat(userDataElement.getErrors())
        return userDataElement.value
    }
}

module.exports = User