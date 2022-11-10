/**
 * Retorna los datos a enviar para rellenar el contrato.
 * 
 * @param {string}
 * @return {json}
 */
function getSolicitarCertificadoPayload(certificadoSeleccionado) {
    if (certificadoSeleccionado) {
        $data.solicitudData.creandoSolicitud = true
        if ($data.solicitudData.eventoSeleccionado && $data.IDS_CERTIFICADOS_EVENTOS.includes(certificadoSeleccionado.idCert)) {
            return {
                contratoIdCertificadoSeleccionado: certificadoSeleccionado.idCert,
                contratoIdEventoSeleccionado: $data.solicitudData.eventoSeleccionado.persistenceId
            }
        }
        //console.log("El Certificado seleccionado no es de eventos")
        return {
            contratoIdCertificadoSeleccionado: certificadoSeleccionado.idCert,
            contratoIdEventoSeleccionado: ''
        }
    }
}

