const UserDataElement = require('./UserDataElement')

class Password extends UserDataElement {

    constructor(value) {
        super('password', value)
        this.validate()
    }

    validate() {
        this.ensureElementIsString()
        this.checkForEmptyString()
        this.validateLength(12, 100)
    }
}

module.exports = Password