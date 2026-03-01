# Library-management-system

    this is a library management API Backend for the management of users and the books

# Routes and the EndPoints

## /users
GET: Get all the list of users in the system
POST: Create/Register a new user

## /users/(id)
GET: Get a user by their ID
PUT: Updating a user by their ID
DELETE: Deleteing a user by their ID (Check if the user still has an issued book) && (is there any file/penalty to be collected)

## /users/subscription-details/(id)
GET: Get a user subscription details by their ID
    >> Date od subscription
    >> valid till ?
    >> Fine if any ?


## /books
GET: Get all the books in the system
POST: Add a new book to the system

## /books/(id)
GET: Get a book by their ID
PUT: Update a book by its ID
DELETE: Delete a book by its ID

## /books/issued
GET: Get all the issued books

## /books/issued/withFine
Get: Get all issued books with their fine amount



### Subscription types
    >> Basic (3 months)
    >> Standard (6 months)
    >> Premium (12 months)


>> If a user missed the renewal date, then user should collected eit $100
>> If a user missed his subscription, then is expected to pay $100
>> If a user missed both renewal & subscription, then the collected amount should be $200 


## Commands:
npm init
npm i express
npm i nodemon --save-dev

npm run dev

in restore node module and packege-lock.json --> npm i / npm intall