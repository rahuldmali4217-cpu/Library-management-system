const express = require('express')
// const { users } = require('./data/users.json')

// importing the routes
const usersRouter = require('./routes/users')
const booksRouter = require('./routes/books')

const app = express()

const port = 8081

app.use(express.json())

app.get('/', (req, res) => {

    res.status(200).json({
        message: 'Home Page :-'
    })
})


app.use('/users', usersRouter)
app.use('/books', booksRouter)




app.listen(port, () => {
    console.log(`server is up and running on http://localhost:${port}`);
})