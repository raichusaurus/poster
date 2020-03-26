const validator = require('validator')

class UserDataElement {

    constructor(value) {
        this.value = value
        this.name = ""
        this.errors = []
    }

    validateLength(min, max) {
        if (this.value.length < min) {
            this.errors.push(`${this.name} must be at least ${min} characters.`)
        }
        if (this.value.length > max) {
            this.errors.push(`${this.name} cannot exceed ${max} characters.`)
        }
    }

    trimAndLowerCase() {
        this.value = this.value.trim().toLowerCase()
    }

    ensureElementIsString() {
        if (typeof (this.value) != "string") {
            this.value = ""
        }
    }

    checkForEmptyString() {
        if (this.value == "") {
            this.errors.push(`You must provide a ${this.name}`)
        }
    }

    checkIsAlphaNumeric() {
        if (this.value != "" && !validator.isAlphanumeric(this.value)) {
            this.errors.push(`${this.name} can only contain letters and numbers`)
        }
    }

    getErrors() {
        return this.errors
    }
}

module.exports = UserDataElement