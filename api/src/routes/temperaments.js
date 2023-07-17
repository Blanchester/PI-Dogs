const { Router } = require('express');
const { getApiTemperaments } = require('./utils');
const axios = require("axios");

const router = Router();


router.get('/', async (req, res) => {
    const temps = await getApiTemperaments();
    res.send(temps);
  });

module.exports = router;