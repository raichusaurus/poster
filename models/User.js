const validator = require('validator')

class User {

    constructor(data) {
        this.data = data
        this.errors = []
    }

    register() {
        this.validate()
        this.cleanUp()

        // only if there are no validation errors
        // then save the user dat a into a database
    }

    validate() {
        this.validateUsername()
        this.validateEmail()
        this.validatePassword()
    }

    cleanUp() {
        this.data.username = this.ensureElementIsString(this.data.username)
        this.data.email = this.ensureElementIsString(this.data.email)
        this.data.password = this.ensureElementIsString(this.data.password)
        this.cleanBogusParameters()
    }

    validateUsername() {
        if (this.data.username == "") {
            this.errors.push("You must provide a username.")
        }
        if (this.data.username != "" && !validator.isAlphanumeric(this.data.username)) {
            this.errors.push("Username can only contain letters and numbers")
        }
        this.validateLength(this.data.username, 3, 30, 'Username')
    }

    validateEmail() {
        if (!validator.isEmail(this.data.email)) {
            this.errors.push("You must provide a valid email address.")
        }
    }

    validatePassword() {
        if (this.data.password == "") {
            this.errors.push("You must provide a password.")
        }
        this.validateLength(this.data.password, 12, 100, 'Password')
    }

    validateLength(value, min, max, name) {
        if (value.length < min) {
            this.errors.push(`${name} must be at least ${min} characters.`)
        }
        if (value.length > max) {
            this.errors.push(`${name} cannot exceed ${max} characters.`)
        }
    }

    cleanBogusParameters() {
        this.data = {
            username: this.data.username.trim().toLowerCase(),
            email: this.data.email.trim().toLowerCase(),
            password: this.data.password
        }
    }

    ensureElementIsString(element) {
        if (typeof (element) != "string") {
            return ""
        }
        return element
    }
}

module.exports = User