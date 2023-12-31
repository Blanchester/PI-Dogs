const axios = require("axios");
const { Dog, Temperament } = require("../db")

const getApiDogs = async () => {
    try {
      const dogrequest = await axios.get("https://api.thedogapi.com/v1/breeds?limit=58");
      const dogs = await dogrequest.data.map((dog) => {
        return {
            id: dog.id,
            name: dog.name,
            image: dog.image.url,
            height: dog.height.metric,
            weight: dog.weight.metric,
            life_span: dog.life_span,
            temperament: dog.temperament
        }
      });
      return dogs;
    } catch (error) {
      console.log(error);
    }
  };

  const getDbDogs = async () => {
    return await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }
    })
};

const getAllDogs = async () => {
    try {
      const apiDogs = await getApiDogs();
      const dbDogs = await getDbDogs();
      return [...apiDogs, ...dbDogs];
    } catch (error) {
      console.log(error);
    }
  };

const getApiTemperaments = async () =>{
  const allData = await getApiDogs();
  const everyTemperament = allData
    .map((dog) => (dog.temperament ? dog.temperament : "No info"))
    .map((dog) => dog?.split(", "));
    const eachTemperament = [...new Set(everyTemperament.flat())];

    eachTemperament.forEach((el) => {
         Temperament.findOrCreate({
            where: { name: el },
        });
    });
  const allTemp = await Temperament.findAll()
  return allTemp
}


  module.exports = {
    getAllDogs,
    getApiTemperaments
  }