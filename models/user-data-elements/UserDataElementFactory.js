const UserDataElement = require('./UserDataElement')
const Username = require('./Username')
const Email = require('./Email')
const Password = require('./Password')

class UserDataElementFactory {

    constructor() {
    }

    createUserDataElement(name, value) {
        if (name == 'username') {
            return new Username(value)
        }
        else if (name == 'email') {
            return new Email(value)
        }
        else if (name == 'password') {
            return new Password(value)
        }
        else {
            return new UserDataElement(name, value)
        }
    }
}

module.exports = UserDataElementFactory