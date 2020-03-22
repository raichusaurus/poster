const Username = require('./user-data/Username')
const Email = require('./user-data/Email')
const Password = require('./user-data/Password')

class User {

    constructor(data) {
        this.data = data
        this.errors = []
    }

    register() {
        this.data = {
            username: new Username(this.data.username),
            email: new Email(this.data.email),
            password: new Password(this.data.password)
        }
        this.errors = this.data.username.getErrors()
            .concat(this.data.email.getErrors())
            .concat(this.data.password.getErrors())

        // only if there are no validation errors
        // then save the user dat a into a database
    }
}

module.exports = User