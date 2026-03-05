const express = require('express')
const { books } = require('../data/books.json')

const { users } = require('../data/users.json')

const router = express.Router()

/**
 * Route: /books
 * Method: GET
 * Description: Get all the list of the books in the system
 * Access: Public
 * Paramters: None
 */

router.get('/', (req, res) => {

    res.status(200).json({
        success: true,
        data: books
    })
})




/**
 * Route: /books/id
 * Method: GET
 * Descrption: Get a book by their ID
 * Access: Public
 * Paramters: id
 */


router.get('/:id', (req, res) => {

    const { id } = req.params
    const book = books.find((each) => each.id === Number(id))


    if (!book) {
        return res.status(404).json({
            success: false,
            message: `Book Not Found For id: ${id}`
        })
    }

    res.status(200).json({
        success: true,
        data: book
    })

})


/**
 * Route: /books
 * Method: POST
 * Descrption: Create/Register a new book
 * Access: Public
 * Paramters: id
 */

// "id": 2,
//     "title": "To Kill a Mockingbird",
//         "author": "Harper Lee",
//             "year": 1960,
//                 "available": true

router.post('/', (req, res) => {

    const { id, title, author, year, available, price } = req.body

    if (!id || !title || !author || !year || !available || !price) {
        return res.status(404).json({
            success: false,
            message: 'Please provide all the required fields'
        })
    }

    const book = books.find((each) => each.id === Number(id))

    if (book) {
        return res.status(409).json({
            success: false,
            message: `Books already Exists with this id: ${id}`,
            data: { id, title, author, year, available, price }
        })
    }

    books.push({ id, title, author, year, available, price })

    res.status(201).json({
        success: true,
        message: 'Book added successfully',
        data: { id, title, author, year, available, price }
    })
})


/**
 * Route: /books
 * Method: PUT
 * Descrption:Update a book by its ID
 * Access: Public
 * Paramters: id
 */


router.put("/:id", (req, res) => {
    const { id } = req.params
    const { data } = req.body || {}


    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Please provide data to update'
        })
    }

    const book = books.find((each) => each.id === Number(id))

    if (!book) {
        return res.status(404).json({
            success: false,
            message: `Book Not Found For id: ${id}`
        })
    }


    // update the book details
    // Object.assign(book, data)


    // WITH SPREAD OPERATOR

    const updateedBook = books.map((each) => {
        if (each.id === Number(id)) {
            return {
                ...each,
                ...data,
            }
        }
        return each
    })



    res.status(200).json({
        success: true,
        message: 'Book Updated Successfully',
        data: updateedBook
    })

})


/**
 * Route: /books/id
 * Method: DELETE
 * Descrption: Delete a book by its ID
 * Access: Public
 * Paramters: id
 */


router.delete('/:id', (req, res) => {

    const { id } = req.params

    const book = books.find((each) => each.id === Number(id))

    if (!book) {
        return res.status(404).json({
            success: false,
            message: `Book not fount for id: ${id}`
        })
    }


    const updatedBook = books.filter((each) => each.id !== Number(id))

    // const index = books.indexOf(book)
    // books.slice(index, 1)


    res.status(200).json({
        success: true,
        data: updatedBook,
        message: "Book Deleted Successfylly"

    })
})




/**
 * Route: /books/issued/for-users
 * Method: GET
 * Descrption: Get all issued books
 * Access: Public
 * Paramters: None
 */

router.get('/issued/for-users', (req, res) => {
    // const issuedBooks = users.filter((each) => each.issuedBook).map((each) => each.issuedBook)

    const usersWithIssuedBooks = users.filter((each) => {
        if (each.issuedBook) {
            return each
        }
    })

    const issuedBooks = []
    usersWithIssuedBooks.forEach((each) => {
        const book = books.find((book) => book.id === each.issuedBook)

        book.issuedBy = each.name
        book.issuedDate = each.issuedDate
        book.returnDate = each.returnDate

        issuedBooks.push(book)
    })

    if (!issuedBooks === 0) {
        return res.status(404).json({
            success: false,
            message: `No books issued yet`
        })
    }

    res.status(200).json({
        success: true,
        data: issuedBooks,
    })
})




module.exports = router