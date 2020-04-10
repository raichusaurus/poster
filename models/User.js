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

    login() {
        this.cleanData('username', 'password')
        return this.findUserInDB()
    }

    findUserInDB() {
        // probably use async await eventually
        return new Promise((resolve, reject) => {
            usersCollection.findOne({username: this.data.username})
                .then(attemptedUser => {
                    if (this.isValidUserNamePassword(attemptedUser)) {
                        resolve('Congrats')
                    }
                    else {
                        reject("Invalid username/password")
                    }
                })
                .catch(e => reject("Please try again later"))
        })
    }

    isValidUserNamePassword(attemptedUser) {
        return (attemptedUser && attemptedUser.password == this.data.password)
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