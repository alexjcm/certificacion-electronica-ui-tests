const revisionData = {
  etiquetaComentario: "Comentario",
  estados: {
    aprobada:"Aprobada", 
    rechazada: "Rechazada"
  }
};
/**
 * Agrega al texto de la etiqueta de comentarios la palabra "(opcional)".
 *
 * @param {string}
 * @return {string}
 */
function getChangeTagComentarios(estadoSeleccionado) {
  return estadoSeleccionado === revisionData.estados.aprobada
    ? revisionData.etiquetaComentario + " (opcional)"
    : revisionData.etiquetaComentario;
}

/**
 * Cambia el texto del botón a Aprobar o Rechazar de acuerdo
 * al estado selccionado.
 *
 * @param {string}
 * @return {string}
 */
function getChangeButtonLabel(estadoSeleccionado) {
  return estadoSeleccionado === revisionData.estados.rechazada ? "Rechazar" : "Aprobar";
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
