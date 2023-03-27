const axios = require('axios');
const URL = 'https://api.thedogapi.com/v1/breeds'
const {Dogs} = require("../models/dogs.js")
const { validationResult } = require('express-validator')

const dogsAPIinfo = async ()=>{
    
    let response = await axios.get(URL);
      
        const conv3 = (val) =>{
            
            let result =parseInt(val.slice(0,1))
            
            return result
          }
                    
        const dogsREADY = response.data 
         .map(d => {
            
             return{
                 _id: d.id,
                 nombre: d.name,
                 peso: conv3(d.weight.metric),
                 altura: conv3(d.height.metric),
                 temperamentos:d.temperament, 
                 imagen: d.image.url
                 }
         });
    
         return dogsREADY
        }

        const crearDogs = async(req, res) =>{
           try {
            const err = validationResult(req)
            if (err.isEmpty()) {

                const item = new Dogs(req.body)
                await item.save()
                res.status(201).json({msg:'se creo un nuevo dog: ', item})                  
            } else {
                res.status(501).json({err})
              }
     
            
           } catch (error) {
            res.status(501).json({error})
           }

        }

        const editarDogs = async(req,res)=>{
            try {
                const err = validationResult(req)
                if (err.isEmpty()) {
                  const Anterior =  await Dogs.findByIdAndUpdate(req.params.id, req.body)
                  const Actualizado = req.body
                    res.status(201).json({msg:'se actualizo ok este dog:', Anterior, Actualizado })
                } else {
                    res.status(501).json({err})
                }
              
            } catch (error) {
                res.status(501).json({error})
            }
        }

        const eliminarDogs = async(req,res)=>{
         const item = await Dogs.findByIdAndDelete(req.params.id)
            res.status(200).json({msg:'se elimino', item})
        }
        
        const verDogsDb = async(req, res)=>{
            const items = await Dogs.find()
            res.status(200).json(items)
        } 
        
        const verDogsApi = async(req, res)=>{
            const items = await dogsAPIinfo()
            res.status(200).json(items)
        }  

        const traerDogs = async(req, res)=>{
            const items = await Dogs.find()
            return items
        }

        const buscarunDogDbId = async(req, res)=>{
            const item = await Dogs.findById(req.params.id)
            res.status(200).json({item})
        }

              
        const dogsTOTAL = async (req, res) => {
           const total = await dogsTOTALvariable()
           res.status(200).json(total)                  
        }

        const dogsTOTALvariable = async (req, res) => {
            const apiInfo = await dogsAPIinfo();
            const DBInfo = await traerDogs();
            const infoTotal = [...DBInfo, ...apiInfo]
            return infoTotal
            
        }

        const buscarPorNombre = async(req,res)=>{
            let {nombre} = req.query
            const dogs =  await dogsTOTALvariable()
            const result = dogs.filter(el=> el.nombre.toLowerCase().includes(nombre.toLowerCase()))

            if(result.length >= 1){
            res.status(200).json(result)}
             else{
             res.status(400).json('no dogs try again');
      }
    } 
   
  
  


        
        module.exports = {
             dogsAPIinfo,
             crearDogs,
             verDogsDb,
             dogsTOTAL,
             verDogsApi,
             buscarunDogDbId,
             editarDogs,
             eliminarDogs,
             dogsTOTALvariable,
             buscarPorNombre
        };
        