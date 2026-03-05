const express = require('express')
const { users } = require('../data/users.json')
const router = express.Router()

/**
 * Route: /users
 * Method: GET
 * Description: Get all the list of the users in the system
 * Access: Public
 * Paramters: None
 */

router.get('/', (req, res) => {

    res.status(200).json({
        success: true,
        data: users
    })
})


/**
 * Route: /users/id
 * Method: GET
 * Descrption: Get a user by their ID
 * Access: Public
 * Paramters: None
 */

router.get('/:id', (req, res) => {

    const { id } = req.params;
    const user = users.find((each) => each.id === Number(id))


    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User Not Found For id: ${id}`
        })
    }
    res.status(200).json({
        success: true,
        data: user
    })
})





/**
 * Route: /users
 * Method: POST
 * Descrption: Create/Register a new user
 * Access: Public
 * Paramters: None
 */

router.post('/', (req, res) => {

    // req.body should have the following fields
    const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;

    // check if all the required fields are present
    if (!id || !name || !surname || !email || !subscriptionType || !subscriptionDate) {
        return res.status(400).json({
            success: false,
            message: 'Please Provide all the required fields'
        })
    }



    // check if the user already exists
    const user = users.find((each) => each.id === Number(id))

    if (user) {
        return res.status(409).json({
            success: false,
            message: `User Already Exists With id: ${id}`
        })
    }


    // if all checks pass, create the user
    // and push it to the users array
    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate
    })


    res.status(201).json({
        success: true,
        message: `User Created Successfully`
    })

})



/**
 * Route: /users/:id
 * Method: PUT
 * Descrption: Updating a user by their ID
 * Access: Public
 * Paramters: ID
 */


router.put('/:id', ((req, res) => {
    const { id } = req.params
    const { data } = req.body

    // check if the user exists
    const user = users.find((each) => each.id === Number(id))

    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User Not FOund for id: ${id}`
        })
    }

    // Object.assign(user, data)
    // with spread operator
    const updatedUser = users.map((each) => {
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
        data: updatedUser,
        message: 'User updated Successfully'
    })
}))


/**
 * Route: /users/:id
 * Method: DELETE
 * Descrption: Deleteing a user by their ID (Check if the user still has an issued book) && (is there any file/penalty to be collected)
 * Access: Public
 * Paramters: ID
 */


router.delete('/:id', (req, res) => {

    const { id } = req.params

    // const { data } = req.body

    // check if the user exists
    const user = users.find((each) => each.id === Number(id))

    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User not fount for id: ${id}`
        })
    }

    // if user exists,filter it out from the users array
    const updatedUser = users.filter((each) => each.id !== Number(id))

    //second method to delete

    const index = users.indexOf(user)
    // users.slice(index, 1)


    res.status(200).json({
        success: true,
        data: updatedUser,
        message: 'User Deleted Successfully'
    })
})


/**
 * Route: /users/subscription-details/:id
 * method: GET
 * Description: Get the subscription details of a user by their ID
 * Access: Public
 * Parameters: id
 */


router.get('/subscription-details/:id', (req, res) => {
    const { id } = req.params

    const user = users.find((each) => each.id === Number(id))

    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User Not Found For id: ${id}`
        })
    }

    // Extract the subscription details from the user object

    const getDateIndays = (data = "") => {
        let date;
        if (data) {
            date = new Date(data)
        }
        else {
            date = new Date()
        }
        let days = Math.floor(date / (1000 * 60 * 60 * 24))
        return days
    }

    const subscriptionType = (date) => {
        if (user.subscriptionType === 'Basic') {
            date = date + 90
        }
        else if (user.subscriptionType === 'Standard') {
            date = date + 180
        }
        else if (user.subscriptionType === 'Premium') {
            date = date + 365
        }
        return date
    }

    // subscription Expiration calculation
    // january 1, 1970 UTC // Miliseconds

    let returnDate = getDateIndays(user.returnDate);
    let currentDate = getDateIndays()
    let subscriptionDate = getDateIndays(user.subscriptionDate)

    let subscriptionExpirationDate = subscriptionType(subscriptionDate)

    const data = {
        ...user,
        subscriptionExpiration: subscriptionExpirationDate < currentDate,
        subscriprionDaysLeft: subscriptionExpirationDate - currentDate,
        daysLeftForExpiration: returnDate - currentDate,
        returnDate: returnDate - currentDate ? "Book is OverDue" : returnDate,
        fine: returnDate < currentDate ? (subscriptionExpiration <= currentDate ? 200 : 100) : 0
    }


    res.status(200).json({
        success: true,
        // data: data
        data
    })
})

module.exports = router;
