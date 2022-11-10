/**
 * Devuelve la URL de la API para crear una instancia del proceso: Crear o Editar Evento Academico.
 *
 * @param {object}
 * @return {string}
 */
function urlCrearOEditarEventoProceso(crearOEditarEventoProceso) {
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
 * @param {object}
 * @return {boolean}
 */
function formErrorEventoCrearOEditarIncompleto(isEditing, evento) {
  var eventIncomplete = null
  if (isEditing) {
    eventIncomplete = !evento.nombre || !evento.tematica ||
      !evento.lugar || !evento.horas ||
      !evento.fechaDeInicio || !evento.fechaDeFinalizacion ||
      !evento.persistenceId_string;
    return eventIncomplete;
  }
  eventIncomplete = !evento.nombre || !evento.tematica || !evento.lugar ||
    !evento.horas || !evento.fechaDeInicio ||
    !evento.fechaDeFinalizacion;
  return eventIncomplete;
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
  urlCrearOEditarEventoProceso,
  formErrorEventoCrearOEditarIncompleto,
  getEventoPayload,
  getEventoEditPayload,
};
