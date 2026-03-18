const bookModel = require('../models/book-model')
const { BookModel, UserModel } = require('../models/index')

const IssuedBook = require('../dtos/book-dto')

// const getAllBooks = () => {

// }

// const getSingleBookById = () => {

// }

// module.exports = {
//     getAllBooks,
//     getSingleBookById
// }


// router.get('/', (req, res) => {

//     res.status(200).json({
//         success: true,
//         data: books
//     })
// })



exports.getAllBooks = async (req, res) => {
    const Books = await BookModel.find()

    if (Books.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'No books in The system'
        })
    }

    res.status(200).json({
        success: true,
        data: Books
    })
}


// router.get('/:id', (req, res) => {

//     const { id } = req.params
//     const book = books.find((each) => each.id === Number(id))


//     if (!book) {
//         return res.status(404).json({
//             success: false,
//             message: `Book Not Found For id: ${id}`
//         })
//     }

//     res.status(200).json({
//         success: true,
//         data: book
//     })

// })


exports.getSingleBookById = async (req, res) => {
    const { id } = req.params;
    const book = await bookModel.findById(id)

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

}




// router.get('/issued/for-users', (req, res) => {
//     // const issuedBooks = users.filter((each) => each.issuedBook).map((each) => each.issuedBook)

//     const usersWithIssuedBooks = users.filter((each) => {
//         if (each.issuedBook) {
//             return each
//         }
//     })

//     const issuedBooks = []
//     usersWithIssuedBooks.forEach((each) => {
//         const book = books.find((book) => book.id === each.issuedBook)

//         book.issuedBy = each.name
//         book.issuedDate = each.issuedDate
//         book.returnDate = each.returnDate

//         issuedBooks.push(book)
//     })

//     if (!issuedBooks === 0) {
//         return res.status(404).json({
//             success: false,
//             message: `No books issued yet`
//         })
//     }

//     res.status(200).json({
//         success: true,
//         data: issuedBooks,
//     })
// })

exports.getAllIssuedBooks = async (req, res) => {
    const users = await UserModel.find({
        issuedBook: { $exists: true },
    }).populate('issuedBook')


    const issuedBooks = users.map((each) => {
        return new IssuedBooks(each)
    })

    if (issuedBooks.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'No Books issued yet'
        })
    };

    res.status(200).json({
        success: true,
        data: issuedBooks
    });
}



// router.post('/', (req, res) => {

//     const { id, name, author, year, available, price } = req.body

//     if (!id || !name || !author || !year || !available || !price) {
//         return res.status(404).json({
//             success: false,
//             message: 'Please provide all the required fields'
//         })
//     }

//     const book = books.find((each) => each.id === Number(id))

//     if (book) {
//         return res.status(409).json({
//             success: false,
//             message: `Books already Exists with this id: ${id}`,
//             data: { id, name, author, year, available, price }
//         })
//     }

//     books.push({ id, title, author, year, available, price })

//     res.status(201).json({
//         success: true,
//         message: 'Book added successfully',
//         data: { id, title, author, year, available, price }
//     })
// })


exports.addNewBook = async (req, res) => {
    const { data } = req.body

    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Please provide the data to add a new book'
        })
    }

    await bookModel.create(data)

    // res.status(201).json({
    //     success: true,
    //     message: 'Book added successfully',
    //     data: data
    // })

    const allBooks = await BookModel.find()
    res.status(201).json({
        success: true,
        message: "Book added successfully",
        data: allBooks
    })
}



// router.put("/:id", (req, res) => {
//     const { id } = req.params
//     const { data } = req.body || {}


//     if (!data || Object.keys(data).length === 0) {
//         return res.status(400).json({
//             success: false,
//             message: 'Please provide data to update'
//         })
//     }

//     const book = books.find((each) => each.id === Number(id))

//     if (!book) {
//         return res.status(404).json({
//             success: false,
//             message: `Book Not Found For id: ${id}`
//         })
//     }


//     // update the book details
//     // Object.assign(book, data)


//     // WITH SPREAD OPERATOR

//     const updateedBook = books.map((each) => {
//         if (each.id === Number(id)) {
//             return {
//                 ...each,
//                 ...data,
//             }
//         }
//         return each
//     })



//     res.status(200).json({
//         success: true,
//         message: 'Book Updated Successfully',
//         data: updateedBook
//     })

// })



exports.updateBookById = async (req, res) => {
    const { id } = req.params
    const { data } = req.body

    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Please provide data to update'
        })
    }

    // const book = await bookModel.findById(id)
    // if (!book) {
    //     return res.status(404).json({
    //         success: false,
    //         message: `Book Not Found For id: ${id}`
    //     })
    // }


    // Object.assign(book, data)
    // await book.save()

    // res.status(200).json({
    //     success: true,
    //     message: 'Book Updated Successfully'
    //     data: book
    // })


    const updatedBook = await bookModel.findOneAndUpdate(
        { _id: id },
        data,
        { new: true }
    )

    if (!updatedBook) {
        return res.status(404).json({
            success: false,
            message: `Book Not Found For id: ${id}`
        })
    }

    res.status(200).json({
        success: true,
        message: 'Book Updated Successfully',
        data: updatedBook
    })
}

// router.delete('/:id', (req, res) => {

//     const { id } = req.params

//     const book = books.find((each) => each.id === Number(id))

//     if (!book) {
//         return res.status(404).json({
//             success: false,
//             message: `Book not fount for id: ${id}`
//         })
//     }


//     const updatedBook = books.filter((each) => each.id !== Number(id))

//     // const index = books.indexOf(book)
//     // books.slice(index, 1)


//     res.status(200).json({
//         success: true,
//         data: updatedBook,
//         message: "Book Deleted Successfylly"

//     })
// })


exports.deleteBookById = async (req, res) => {
    const { id } = req.params

    const book = await bookModel.findById(id)

    if (!book) {
        return res.status(404).json({
            success: false,
            message: `Book Not Found for id: ${id}`
        })
    }

    await bookModel.findByIdAndDelete(id)

    res.status(200).json({
        success: true,
        message: 'Book Deleted Successfully'
    })
}