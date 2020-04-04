const UserDataElement = require('./UserDataElement')

class Username extends UserDataElement {

    constructor(value) {
        super('username', value)
        this.validate()
    }

    validate() {
        this.ensureElementIsString()
        this.checkForEmptyString()
        this.checkIsAlphaNumeric()
        this.validateLength(3, 30)
        this.trimAndLowerCase()
    }
}

module.exports = Username