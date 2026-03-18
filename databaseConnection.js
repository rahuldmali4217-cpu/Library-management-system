// const dns = require('node:dns');
// dns.setServers(['8.8.8.8', '8.8.4.4']);  
// const mongoose = require('mongoose')


// function DbConnection(){
//     const DB_URL = process.env.MONGO_URI

//     mongoose.connect(DB_URL)
//     const db = mongoose.connection;

//     db.on("error", console.error.bind(console, 'Connection Error'))
//     db.once('open', ()=>{
//         console.log('DB Connected...');
//     })
// }

// module.exports = DbConnection; 


const dns= require('node:dns').setServers(['8.8.8.8', '8.8.4.4']);  
const mongoose = require('mongoose')

function DbConnection() {
    const DB_URL = process.env.MONGO_URI

    mongoose.connect(DB_URL)

    const db = mongoose.connection

    db.on('error', console.error.bind(console,'Connection Error'))
    db.once('open', function(){
        console.log('DB Connected...');
        
    })

}

module.exports = DbConnection