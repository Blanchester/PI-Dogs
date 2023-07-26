const { Router } = require('express');
const {
    getAllDogs,
    getApiTemperaments
} = require('./utils');
const { Dog, Temperament } = require('../db');

const router = Router();

// router.get('/', async (req, res) => {
//     const {name} = req.query;
//     let allDogs = await getAllDogs();
//     if(name) {
//         let nameDog = allDogs.filter(p => p.name.toLowerCase().includes(name.toLocaleLowerCase()));
//         nameDog.length ? 
//         res.status(200).send(nameDog) :
//         res.status(404).send("No se encontro el dog")
//     }else {
//         res.status(200).send(allDogs)
//   }
//   });

  // router.get('/', async (req, res) => {
  //   const {height} = req.query;
  //   let allDogs = await getAllDogs();
  //   if(height) {
  //       let heightDog = allDogs.filter(p => p.height.includes(height));
  //       heightDog.length ? 
  //       res.status(200).send(heightDog) :
  //       res.status(404).send("No se encontro el dog")
  //   }else {
  //       res.status(200).send(allDogs)
  // }
  // });

router.get('/:id', async (req, res) => {
  const { id } = req.params;
    const dogs = await getAllDogs();
    if(id){
        const dogsId = dogs.filter( el => el.id == id)
        dogsId.length ? 
        res.status(200).json(dogsId) :
        res.status(404).send("No se encontro el perrito")
    }
});

router.post('/', async (req, res) => {
    const {
      name, image, height, weight, life_span, temperament,
    } = req.body;
  
    const newDog = await Dog.create({
        name, image, height, weight, life_span,
    });
    let tempDB = await Temperament.findAll({
      where: { name: temperament },
    });
    if (!tempDB.length) { 
      await getApiTemperaments();
      tempDB = await Temperament.findAll({
        where: { name: temperament },
      });
    }
    newDog.addTemperament(tempDB);
    res.send('Perrito creado con exito');
  });


module.exports = router