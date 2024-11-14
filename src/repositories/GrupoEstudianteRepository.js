const pool = require('../config/databaseController');

module.exports = {

    // Obtener todos los grupos - estudiantes
    obtenerTodosLosGruposEstudiantes: async () => {
        try {
            const result = await pool.query('SELECT * FROM grupo_estudiantes');
            return result;
        } catch (error) {
            console.error('Ocurrió un problema al consultar la lista de grupos:', error);
            throw error;
        }
    },

    // Obtener todos los grupos
    obtenerTodosLosGrupos: async () => {
        try {
            const rows = await pool.query('SELECT * FROM grupos');
            return rows; // Retorna un array de grupos
        } catch (error) {
            console.error('Ocurrió un problema al consultar la lista de grupos:', error);
            throw error;
        }
    },

    // Obtener todos los estudiantes
    obtenerTodosLosEstudiantes: async () => {
        try {
            const rows = await pool.query('SELECT * FROM estudiantes');
            return rows; // Retorna un array de estudiantes
        } catch (error) {
            console.error('Ocurrió un problema al consultar la lista de estudiantes:', error);
            throw error;
        }
    },

    insertarEstudianteEnGrupo: async (idgrupo, idestudiante) => {
        try {
            const result = await pool.query(
                'INSERT INTO grupo_estudiantes (idgrupo, idestudiante) VALUES (?, ?)',
                [idgrupo, idestudiante]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al insertar el estudiante en el grupo:', error);
            throw error;
        }
    },

    // Actualizar la asignación de un estudiante a un grupo
    actualizarEstudianteEnGrupo: async (idgrupoestudiante, idgrupo, idestudiante) => {
        try {
            const result = await pool.query(
                'UPDATE grupo_estudiantes SET idgrupo = ?, idestudiante = ? WHERE idgrupoestudiante = ?',
                [idgrupo, idestudiante, idgrupoestudiante]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al actualizar la asignación del estudiante al grupo:', error);
            throw error;
        }
    },

    // Eliminar un estudiante de un grupo
    eliminarEstudianteDeGrupo: async (idgrupoestudiante) => {
        try {
            const result = await pool.query(
                'DELETE FROM grupo_estudiantes WHERE idgrupoestudiante = ?',
                [idgrupoestudiante]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al eliminar el estudiante del grupo:', error);
            throw error;
        }
    }
};
