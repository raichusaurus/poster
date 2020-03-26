const UserDataElement = require('./UserDataElement')

class Email extends UserDataElement {

    constructor(value) {
        super(value)
        this.name = 'email'
        this.validate()
    }

    validate() {
        this.checkForEmptyString()
        this.trimAndLowerCase()
    }
}

module.exports = Email