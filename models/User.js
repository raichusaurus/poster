const usersCollection = require('../db').collection('users')

const UserDataElementFactory = require('./user-data-elements/UserDataElementFactory')

class User {

    constructor(data) {
        this.data = data
        this.errors = []
    }

    register() {
        this.cleanData('username', 'email', 'password')
        if (!this.errors.length) {
            usersCollection.insertOne(this.data)
        }
    }

    login(callback) {
        this.cleanData('username', 'password')
        this.findUser(callback)
    }

    findUser(callback) {
        usersCollection.findOne({username: this.data.username}, (err, attemptedUser) => {
            this.onFindUser(attemptedUser, callback)
        })
    }

    onFindUser(attemptedUser, callback) {
        if (attemptedUser && attemptedUser.password == this.data.password) {
            callback('Congrats!')
        } else {
            callback('Invalid username/password')
        }
    }

    cleanData(...elementNames) {
        let userDataElements = []
        let userDataElementFactory = new UserDataElementFactory()
        elementNames.forEach((elementName) => {
            userDataElements.push(userDataElementFactory.createUserDataElement(elementName, this.data[elementName]))
        })
        this.addUserElementsAndErrors(...userDataElements)
    }

    addUserElementsAndErrors(...userDataElements) {
        this.data = {}
        userDataElements.forEach((userDataElement) => this.addUserElementAndErrors(userDataElement))
    }

    addUserElementAndErrors(userDataElement) {
        this.errors = this.errors.concat(userDataElement.errors)
        this.data[userDataElement.name] = userDataElement.value
    }
}

module.exports = User