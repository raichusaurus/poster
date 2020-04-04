const UserDataElement = require('./UserDataElement')

class Email extends UserDataElement {

    constructor(value) {
        super('email', value)
        this.validate()
    }

    validate() {
        this.checkForEmptyString()
        this.trimAndLowerCase()
    }
}

module.exports = Email