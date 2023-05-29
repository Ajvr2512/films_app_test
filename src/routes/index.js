const express = require('express');
const routerActor = require('./actor.router');
const routerGenre = require('./genre.router');
const routerDirector = require('./director.router');
const routerMovie = require('./movie.router');
const router = express.Router();

// colocar las rutas aquí

router.use('/actors',routerActor);
router.use('/genres',routerGenre);
router.use('/directors',routerDirector)
router.use('/movies',routerMovie)
module.exports = router;