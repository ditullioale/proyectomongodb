const { Router } = require("express");
const router = Router();
const {  dogsAPIinfo, crearDogs } = require("../controllers/index.js");

router.get('/', async (req, res)=>{
    let total = await dogsAPIinfo();
    res.status(200).json(total);
})

//falta meter todos los dogs a la db no se si es necesario, creeria que no
//---------------POST------------ASI ES EN SEQUELIZE EN POSTGRESQL
router.post("/", async (req, res) => {
    let { name, weight, height, life_span, temperament, image } = req.body;
  
    const capitalizar = (name) => {
      return name.charAt(0).toUpperCase() + name.slice(1);
    };
  
    if (!name || !height || !weight)
      return res.status(400).json({ msg: "faltan datos" });
  
      try {
     
        let image1 = await (
          await axios.get("https://dog.ceo/api/breeds/image/random")
        ).data.message;
       
        const dogCREATED = await Dog.findOrCreate({
          //devuelvo un array (OJOOO!!!!)
            //VER UN EJEMPLO Y PONER VALORES EXACTAMENTE IGUALES
          where: {
            name: capitalizar(name),
            weight,
            height,
            life_span,
            image: image? image : image1, //ACA SI NO PONES NADA PONE UNA AUTOMATICAMENTE
            temperament, //OJO ACA VA ARRAY
          },
        });
    
    
      res.status(200).json(dogCREATED);
    } catch (err) {
      throw new Error(err);
    }
  });
  //-------fin post----


//---------------BORRAR----------------ASI ES EN SEQUELIZE EN POSTGRESQL
router.delete('/', async(req,res)=>{
    let {name} = req.query
    try {
      await Dog.destroy({
        where:{
          name: name,
        }
      })
      res.status(200).json('dog borrado')
    } catch (error) {
      res.status(404).json(error)
      
    }
  })
  
  //---------------ACTUALIZAR----------------ASI ES EN SEQUELIZE EN POSTGRESQL
  router.put('/',async(req,res)=>{
    let{ name,height,weight,life_span} = req.body
    try {
      await Dog.update(
        {name,height,weight,life_span},
        {
          where:{
            name: name
          }}
      )
      res.status(200).json('update ok')
    } catch (error) {
      }})
  

module.exports = router;