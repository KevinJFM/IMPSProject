const express = require('express');
const router = express.Router();
const queries = require('../repositories/EstudianteRepository');

// Endpoint para mostrar todos los estudiantes
router.get('/', async (request, response) => {
    const estudiantes = await queries.obtenerTodosLosEstudiantes();
    response.render('estudiantes/listado', { estudiantes }); // Mostramos el listado de estudiantes
});

// Endpoint que permite mostrar el formulario para agregar un nuevo estudiante
router.get('/agregar', async (request, response) => {
    // Renderizamos el formulario
    response.render('estudiantes/agregar');
});

// Endpoint para agregar un estudiante
router.post('/agregar', async (request, response) => {
    const { idestudiante, nombre, apellido, email, idcarrera, usuario } = request.body;
    try {
        const resultado = await queries.insertarEstudiante(idestudiante, nombre, apellido, email, idcarrera, usuario);
        if (resultado) {
            console.log('Estudiante agregado con éxito');
            response.redirect('/estudiantes');
        } else {
            console.log('Error al agregar estudiante');
            response.status(500).send('Error al agregar estudiante');
        }
    } catch (error) {
        console.error('Error al agregar estudiante:', error);
        response.status(500).send('Error al agregar estudiante');
    }
});

// Endpoint que permite eliminar un estudiante
router.get('/eliminar/:idestudiante', async (request, response) => {
    const { idestudiante } = request.params;
    const resultado = await queries.eliminarEstudiante(idestudiante);
    if (resultado) {
        console.log('Eliminado con éxito');
    }
    response.redirect('/estudiantes');
});

// Endpoint para mostrar el formulario de actualización de un estudiante
router.get('/actualizar/:idestudiante', async (request, response) => {
    const { idestudiante } = request.params;
    // Aquí deberías obtener los datos del estudiante para pre-llenar el formulario
    const estudiante = await queries.obtenerEstudiantePorId(idestudiante);
    response.render('estudiantes/actualizar', { estudiante });
});

// Endpoint para actualizar un estudiante
router.post('/actualizar/:idestudiante', async (request, response) => {
    const { idestudiante } = request.params;
    const { nombre, apellido, email, idcarrera, usuario } = request.body;
    try {
        const resultado = await queries.actualizarEstudiante(idestudiante, nombre, apellido, email, idcarrera, usuario);
        if (resultado) {
            console.log('Estudiante actualizado con éxito');
            response.redirect('/estudiantes');
        } else {
            console.log('Error al actualizar estudiante');
            response.status(500).send('Error al actualizar estudiante');
        }
    } catch (error) {
        console.error('Error al actualizar estudiante:', error);
        response.status(500).send('Error al actualizar estudiante');
    }
});

module.exports = router;