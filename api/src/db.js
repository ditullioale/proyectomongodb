const mongoose = require("mongoose")
require("dotenv").config()
const conect = async () => {
    try {
        await mongoose.connect(process.env.CONNECTMONGO)
        console.log ("La base esta conectada")
    } catch  {
        console.log ("No conectado")
        
    }
}
 
module.exports = {conect}