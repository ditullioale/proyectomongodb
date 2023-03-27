const express = require ('express')
const { Router } = require('express');
const router = Router();
const {crearDogs, dogsTOTAL, verDogsApi, verDogsDb, buscarunDogDbId, editarDogs, eliminarDogs, buscarPorNombre} = require('../controllers/index.js')
const { validarId } = require('../middlewares/validarId.js')
const{ check } = require('express-validator')

//const dogs = require('./dogs.js')

router.get('/listadoApi', verDogsApi)
router.get('/listadoDb', verDogsDb)
router.get('/listadoDb/:id',validarId, buscarunDogDbId)
router.get('/listadoTotal', dogsTOTAL)
router.get('/buscar', buscarPorNombre)


router.post('/crear',[
check('nombre').not().isEmpty().withMessage('el nombre es requerido').isLength({min: 3, max: 10}).withMessage('el nombre debe contener entre 3 y 10 caracteres'),
check('altura').not().isEmpty().withMessage('el campo altura es requerido').isNumeric().withMessage('debe ser un numero'),
check('peso').not().isEmpty().withMessage('el campo peso es requerido').isNumeric().withMessage('debe ser un numero'),
], crearDogs)

router.put('/editar/:id',validarId, [
    check('nombre').not().isEmpty().withMessage('el nombre es requerido').isLength({min: 3, max: 10}).withMessage('el nombre debe contener entre 3 y 10 caracteres'),
    check('altura').not().isEmpty().withMessage('el campo altura es requerido').isNumeric().withMessage('debe ser un numero'),
    check('peso').not().isEmpty().withMessage('el campo peso es requerido').isNumeric().withMessage('debe ser un numero'),
    ] , editarDogs)

router.delete('/eliminar/:id', validarId, eliminarDogs)


module.exports = router