/**
 * Devuelve la URL de la API para crear una instancia del proceso: Crear Evento Academico.
 *
 * @return {string}
 */
function urlCrearEventoProceso(crearOEditarEventoProceso) {
  if (crearOEditarEventoProceso && crearOEditarEventoProceso.length > 0) {
    return (
      "../API/bpm/process/" + crearOEditarEventoProceso[0].id + "/instantiation"
    );
  }
}

/**
 * Devuelve la URL de la API para crear una instancia del proceso: Editar Evento Academico.
 *
 * @return {string}
 */
function urlEditarEventoProceso(crearOEditarEventoProceso) {
  if (crearOEditarEventoProceso && crearOEditarEventoProceso.length > 0) {
    return (
      "../API/bpm/process/" + crearOEditarEventoProceso[0].id + "/instantiation"
    );
  }
}

/**
 * Permite validar si todos los campos del formulario correspondiente han sido llenados,
 * retorna 'false' si todos los campos fueron llenados.
 *
 * @return {boolean}
 */
function formErrorEventoIncompleto(contratoEventoInput) {
  var camposIncompletos =
    !contratoEventoInput.nombre ||
    !contratoEventoInput.tematica ||
    !contratoEventoInput.lugar ||
    !contratoEventoInput.horas ||
    !contratoEventoInput.fechaDeInicio ||
    !contratoEventoInput.fechaDeFinalizacion;
  return camposIncompletos;
}

/**
 * Permite validar si todos los campos del formulario correspondiente han sido llenados,
 * retorna 'false' si todos los campos fueron llenados.
 *
 * @return {boolean}
 */
function formErrorEventoEditarIncompleto(objetoEvento_selectedCopia) {
  var camposEditIncompletos =
    !objetoEvento_selectedCopia.nombre ||
    !objetoEvento_selectedCopia.tematica ||
    !objetoEvento_selectedCopia.lugar ||
    !objetoEvento_selectedCopia.horas ||
    !objetoEvento_selectedCopia.fechaDeInicio ||
    !objetoEvento_selectedCopia.fechaDeFinalizacion ||
    !objetoEvento_selectedCopia.persistenceId_string;
  return camposEditIncompletos;
}

/**
 * Retorna los datos a enviar para rellenar el contrato.
 *
 * @param {object}
 * @return {json}
 */
function getEventoPayload(contratoEventoInput) {
  return {
    contratoEventoInput: contratoEventoInput,
    // El resto de contratos se los va a enviar vacios porque esta funcion es para Crear Eventos
    contratoEventoEdit: {
      nombre: "",
      tematica: "",
      lugar: "",
      horas: null,
      fechaDeInicio: null,
      fechaDeFinalizacion: null,
    },
    contratoEventoPersistenceId: "",
  };
}

/**
 * Retorna los datos a enviar para rellenar el contrato.
 *
 * @param {object}
 * @return {json}
 */
function getEventoEditPayload(eventoEdit) {
  return {
    contratoEventoEdit: {
      nombre: eventoEdit.nombre,
      tematica: eventoEdit.tematica,
      lugar: eventoEdit.lugar,
      horas: eventoEdit.horas,
      fechaDeInicio: eventoEdit.fechaDeInicio,
      fechaDeFinalizacion: eventoEdit.fechaDeFinalizacion,
    },
    contratoEventoPersistenceId: eventoEdit.persistenceId_string,
    // Enviamos vacio el contrato restante ya que esta funcion es para Editar eventos
    contratoEventoInput: {
      nombre: "",
      tematica: "",
      lugar: "",
      horas: null,
      fechaDeInicio: null,
      fechaDeFinalizacion: null,
    },
  };
}
module.exports = {
  urlCrearEventoProceso,
  urlEditarEventoProceso,
  formErrorEventoIncompleto,
  formErrorEventoEditarIncompleto,
  getEventoPayload,
  getEventoEditPayload,
};
