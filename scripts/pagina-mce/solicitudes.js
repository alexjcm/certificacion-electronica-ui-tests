/**
 * Retorna los datos a enviar para rellenar el contrato.
 *
 * @param {string}
 * @return {json}
 */
function getCancelarSolicitudPayload(solicitudSeleccionada) {
  return {
    contratoIdSolicitudDeCetificado: solicitudSeleccionada.persistenceId_string,
  };
}

/**
 * Devuelve la URL de la API para crear una instancia del proceso: Cancelar Solicitud de certificado.
 *
 * @return {string}
 */
function urlIniciarCancelarProceso(cancelarProceso) {
  if (cancelarProceso && cancelarProceso.length > 0) {
    return "../API/bpm/process/" + cancelarProceso[0].id + "/instantiation";
  }
}

/**
 * Devuelve la URL del formulario de instanciación del proceso de solicitud de certificado.
 *
 * @return {string}
 */
function urlIniciarProcesoNuevo(crearProceso) {
  if (crearProceso && crearProceso.length > 0) {
    return (
      "/bonita/portal/resource/process/" +
      crearProceso[0].name +
      "/" +
      crearProceso[0].version +
      "/content/?id=" +
      crearProceso[0].id
    );
  }
}

module.exports = {
  getCancelarSolicitudPayload,
  urlIniciarCancelarProceso,
  urlIniciarProcesoNuevo,
};
