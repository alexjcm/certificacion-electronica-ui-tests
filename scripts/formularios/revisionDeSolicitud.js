const constants = {
  LABEL_COMMENT: "Comentario",
  state: {
    APROVED: "Aprobada",
    REJECTED: "Rechazada"
  }
};
/**
 * Agrega al texto de la etiqueta de comentarios la palabra "(opcional)".
 *
 * @param {string}
 * @return {string}
 */
function getChangeTagComentarios(estadoSeleccionado) {
  return estadoSeleccionado === constants.state.APROVED
    ? constants.LABEL_COMMENT + " (opcional)"
    : constants.LABEL_COMMENT;
}

/**
 * Cambia el texto del botón a Aprobar o Rechazar de acuerdo
 * al estado selccionado.
 *
 * @param {string}
 * @return {string}
 */
function getChangeButtonLabel(estadoSeleccionado) {
  return estadoSeleccionado === constants.state.REJECTED ? "Rechazar" : "Aprobar";
}

/**
 * Retorna los datos a enviar para rellenar los contratos.
 *
 * @param {string}
 * @param {string}
 * @return {json}
 */
function getRevisionSolicitudPayload(contratoEstado, contratoComentario) {
  return {
    contratoEstado: contratoEstado.toLowerCase(),
    contratoComentario: contratoComentario,
  };
}

module.exports = {
  getChangeTagComentarios,
  getChangeButtonLabel,
  getRevisionSolicitudPayload,
};
