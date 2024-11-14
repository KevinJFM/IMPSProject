const express = require('express');
const router = express.Router();
const queries = require('../repositories/GrupoEstudianteRepository');

// Endpoint para mostrar todos los grupos
router.get('/', async (request, response) => {
    try {
        const grupos = await queries.obtenerTodosLosGruposEstudiantes();
        response.render('grupo_estudiantes/listado', { grupos });
    } catch (error) {
        console.error('Error al obtener grupos:', error);
        response.status(500).send('Error al obtener grupos');
    }
});

// Endpoint para mostrar el formulario de agregar grupo
router.get('/agregar', async (request, response) => {
    try {
        const grupos = await queries.obtenerTodosLosGrupos(); // Obtener todos los grupos
        const estudiantes = await queries.obtenerTodosLosEstudiantes(); // Obtener todos los estudiantes
        response.render('grupo_estudiantes/agregar', { grupos, estudiantes });
    } catch (error) {
        console.error('Error al cargar el formulario de agregar grupo:', error);
        response.status(500).send('Error al cargar el formulario de agregar grupo');
    }
});

router.post('/agregar', async (request, response) => {
    const { idgrupo, idestudiante } = request.body; // Obtenemos los valores enviados
    try {
        // Si no se seleccionaron grupo o estudiante, mostramos un mensaje de error
        if (!idgrupo || idgrupo === "0" || !idestudiante || idestudiante === "0") {
            const grupos = await queries.obtenerTodosLosGrupos();
            const estudiantes = await queries.obtenerTodosLosEstudiantes();
            return response.render('grupo_estudiantes/agregar', {
                grupos,
                estudiantes,
                mensaje: 'Debe seleccionar al menos un estudiante para el grupo'
            });
        }

        const resultado = await queries.insertarEstudianteEnGrupo(idgrupo, idestudiante);
        if (resultado) {
            console.log('Grupo agregado con éxito');
            response.redirect('/grupo_estudiantes');
        } else {
            response.render('grupo_estudiantes/agregar', {
                mensaje: 'Error al agregar grupo'
            });
        }
    } catch (error) {
        console.error('Error al agregar grupo:', error);
        const grupos = await queries.obtenerTodosLosGrupos();
        const estudiantes = await queries.obtenerTodosLosEstudiantes();
        response.render('grupo_estudiantes/agregar', {
            grupos,
            estudiantes,
            mensaje: 'Error al agregar grupo: ' + error.message
        });
    }
});


// Endpoint para mostrar el formulario de actualización de un grupo
router.get('/actualizar/:idgrupo', async (request, response) => {
    const { idgrupo } = request.params;
    try {
        const grupo = await queries.obtenerGrupoPorId(idgrupo);
        const estudiantes = await queries.obtenerTodosLosEstudiantes(); // Obtener todos los estudiantes

        if (grupo) {
            // Aquí podemos agregar la lógica para seleccionar los estudiantes que ya están asociados al grupo
            const estudiantesSeleccionados = grupo.estudiantes || []; // Dependiendo de la estructura, asegúrate de obtener los estudiantes del grupo
            response.render('grupo_estudiantes/actualizar', { grupo, estudiantes, estudiantesSeleccionados });
        } else {
            response.status(404).send('Grupo no encontrado');
        }
    } catch (error) {
        console.error('Error al obtener grupo para actualizar:', error);
        response.status(500).send('Error al obtener grupo para actualizar');
    }
});

// Endpoint para actualizar un grupo
router.post('/actualizar/:idgrupo', async (request, response) => {
    const { idgrupo } = request.params;
    const { nombre, estudiantesSeleccionados } = request.body; // Obtenemos los estudiantes seleccionados
    try {
        // Validamos que al menos un estudiante haya sido seleccionado
        if (!estudiantesSeleccionados || estudiantesSeleccionados.length === 0) {
            const grupo = await queries.obtenerGrupoPorId(idgrupo);
            const estudiantes = await queries.obtenerTodosLosEstudiantes();
            return response.render('grupo_estudiantes/actualizar', {
                grupo,
                estudiantes,
                mensaje: 'Debe seleccionar al menos un estudiante para el grupo'
            });
        }

        const resultado = await queries.actualizarEstudianteEnGrupo(idgrupo, nombre, estudiantesSeleccionados);
        if (resultado) {
            console.log('Grupo actualizado con éxito');
            response.redirect('/grupo_estudiantes');
        } else {
            response.status(500).send('Error al actualizar grupo');
        }
    } catch (error) {
        console.error('Error al actualizar grupo:', error);
        response.status(500).send('Error al actualizar grupo');
    }
});

// Endpoint para eliminar un grupo
router.get('/eliminar/:idgrupo', async (request, response) => {
    const { idgrupo } = request.params;
    try {
        const resultado = await queries.eliminarEstudianteDeGrupo(idgrupo);
        if (resultado) {
            console.log('Grupo eliminado con éxito');
        } else {
            console.log('No se pudo eliminar el grupo');
        }
        response.redirect('/grupo_estudiantes');
    } catch (error) {
        console.error('Error al eliminar grupo:', error);
        response.status(500).send('Error al eliminar grupo');
    }
});

module.exports = router;
