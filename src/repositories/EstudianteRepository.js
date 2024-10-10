const pool = require('../config/databaseController');

module.exports = {
    //Consulta para obtener todos los estudiantes
    obtenerTodosLosEstudiantes: async () => {
        try {
            const result = await pool.query('SELECT * FROM estudiantes');
            return result;
        } catch (error) {
            console.error('Ocurrio un problema al consultar la lista de estudiantes: ', error);
        }
    },

    // Eliminar un estudiante
    eliminarEstudiante: async (idestudiante) => {
        try {
            const result = await pool.query('DELETE FROM estudiantes WHERE idestudiante = ?', [idestudiante]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro al eliminar el registro', error);
        }
    },

    // Insertar un estudiante
    insertarEstudiante: async (idestudiante, nombre, apellido, email, idcarrera, usuario) => {
        try {
            // Ver si el estudiante existe
            const carreraExists = await pool.query('SELECT 1 FROM carreras WHERE idcarrera = ?', [idcarrera]);
            if (!carreraExists.length) {
                throw new Error(`La carrera con id ${idcarrera} no existe`);
            }

            const result = await pool.query('INSERT INTO estudiantes (idestudiante, nombre, apellido, email, idcarrera, usuario) VALUES (?, ?, ?, ?, ?, ?)', [idestudiante, nombre, apellido, email, idcarrera, usuario]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al insertar el estudiante', error);
        }
    },

    // Actualizar un estudiante
    actualizarEstudiante: async (idestudiante, nombre, apellido, email, idcarrera, usuario) => {
        try {
            // Ver si la carrera existe
            const carreraExists = await pool.query('SELECT 1 FROM carreras WHERE idcarrera = ?', [idcarrera]);
            if (!carreraExists.length) {
                throw new Error(`La carrera con id ${idcarrera} no existe`);
            }

            const result = await pool.query('UPDATE estudiantes SET nombre = ?, apellido = ?, email = ?, idcarrera = ?, usuario = ? WHERE idestudiante = ?', [nombre, apellido, email, idcarrera, usuario, idestudiante]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al actualizar el estudiante', error);
        }
    }
}