const { Dogs } = require('../models/dogs.js')

const validarId = async(req, res, next) =>{

    try {

        const item = await Dogs.findById(req.params.id)
        if (item !== null) {
            next()
            
        } else {
            res.status(500).json({msg: 'no existe el id'})
        }
        
    } catch (error) {
        res.status(500).json({error})
    }

 
}





module.exports = { validarId  }