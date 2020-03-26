const mongodb = require('mongodb')

const connectionString = 'mongodb+srv://todoAppUser:todoAppPass@cluster0-m112t.mongodb.net/Poster?retryWrites=true&w=majority'

mongodb.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
    module.exports = client.db()
    const app = require('./app')
    app.listen(3000)
})