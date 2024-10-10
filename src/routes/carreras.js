const express = require('express');
const router = express.Router();
const queries = require('../repositories/CarreraRepository');

// Endpoint para mostrar todas las carreras
router.get('/', async (request, response) => {
    try {
        const carreras = await queries.obtenerTodasLasCarreras();
        response.render('carreras/listado', {carreras});
    } catch (error) {
        console.error('Error al obtener carreras:', error);
        response.status(500).send('Error al obtener carreras');
    }
});

// Endpoint que permite mostrar el formulario para agregar una nueva carrera
router.get('/agregar', (request, response) => {
    response.render('carreras/agregar');
});

// Endpoint para agregar una carrera
router.post('/agregar', async(request, response) => {
    const { idcarrera, carrera } = request.body;
    try {
        const resultado = await queries.insertarCarrera(idcarrera, carrera);
        if(resultado) {
            console.log('Carrera agregada con éxito');
            response.redirect('/carreras');
        } else {
            console.log('Error al agregar carrera');
            response.status(500).send('Error al agregar carrera');
        }
    } catch (error) {
        console.error('Error al agregar carrera:', error);
        response.status(500).send('Error al agregar carrera');
    }
});

// Endpoint para mostrar el formulario de actualización de una carrera
router.get('/actualizar/:idcarrera', async(request, response) => {
    const { idcarrera } = request.params;
    try {
        const carrera = await queries.obtenerCarreraPorId(idcarrera);
        response.render('carreras/actualizar', { carrera });
    } catch (error) {
        console.error('Error al obtener carrera para actualizar:', error);
        response.status(500).send('Error al obtener carrera para actualizar');
    }
});

// Endpoint para actualizar una carrera
router.post('/actualizar/:idcarrera', async(request, response) => {
    const { idcarrera } = request.params;
    const { carrera } = request.body;
    try {
        const resultado = await queries.actualizarCarrera(idcarrera, carrera);
        if(resultado) {
            console.log('Carrera actualizada con éxito');
            response.redirect('/carreras');
        } else {
            console.log('Error al actualizar carrera');
            response.status(500).send('Error al actualizar carrera');
        }
    } catch (error) {
        console.error('Error al actualizar carrera:', error);
        response.status(500).send('Error al actualizar carrera');
    }
});

// Endpoint que permite eliminar una carrera
router.get('/eliminar/:idcarrera', async(request, response) => {
    const { idcarrera } = request.params;
    try {
        const resultado = await queries.eliminarCarrera(idcarrera);
        if(resultado){
            console.log('Carrera eliminada con éxito');
        } else {
            console.log('No se pudo eliminar la carrera');
        }
        response.redirect('/carreras');
    } catch (error) {
        console.error('Error al eliminar carrera:', error);
        response.status(500).send('Error al eliminar carrera');
    }
});

module.exports = router;