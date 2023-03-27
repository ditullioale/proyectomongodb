const mongoose = require("mongoose")

const Schema = mongoose.Schema
const dogsSchema = new Schema ({
    // id: {
    //     type: Number,
    //     required: true
    //   },
      nombre: {
        type: String,
        required: true

      },
      peso: {
        type: Number,
        required: true
        
      },
      altura: {
        type: Number,
        required: true
        
      },
        
      temperamentos:{
        type: String,
        
      },
      imagen:{
        type: String,
        
      },


})

const Dogs = mongoose.model("Dogs", dogsSchema)
module.exports = {Dogs}