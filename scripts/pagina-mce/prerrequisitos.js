/**
 * Retorna los datos a enviar para rellenar el contrato al crear o editar un parametro.
 * 
 * @param {object}
 * @return {json}
 */
function getCreateOrEditParamPayload(parametro) {
    if (parametro.persistenceId === "" || parametro.persistenceId === null) {
        parametro.id = 12
    }

    return {
        contratoParametro: {
            id: parametro.id,
            nombre: parametro.nombre.trim(),
            valor: parametro.valor.trim(),
            descripcion: parametro.descripcion,
            contieneInfoSensible: parametro.contieneInfoSensible,
            persistenceId: parametro.persistenceId
        }
    }
}

/**
     * Permite validar si todos los campos del formulario correspondiente han sido llenados,
     * retorna 'false' si todos los campos fueron llenados.
     * 
     * @param {Boolean}
     * @param {object}
     * @return {boolean} 
     */
function formErrorParametroCrearOEditarIncompleto(isEditing, parametro) {
    var paramIncomplete = null
    if (isEditing) {
        paramIncomplete = !parametro.nombre || !parametro.valor ||
            !parametro.id || !parametro.persistenceId
        return paramIncomplete
    }

    paramIncomplete = !parametro.nombre || !parametro.valor
    return paramIncomplete
}

module.exports = {
    getCreateOrEditParamPayload,
    formErrorParametroCrearOEditarIncompleto,
};