const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogRoutes = require("./dogs")
const temperamentRoutes = require("./temperaments")


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", dogRoutes);
router.use("/temperaments", temperamentRoutes);


module.exports = router;
