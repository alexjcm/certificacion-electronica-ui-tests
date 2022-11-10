const LIST_FUNCTIONARY_SIGNING = [
  "Firman la Secretaria y el Gestor",
  "Firma el Gestor",
];

/**
 * Este script ayuda a seleccionar automaticamente cualquiera de las 
 * siguientes opciones:
 *     - "Secretaria de la carrera y el Gestor/Director de la carrera"
 *     - "Gestor/Director de la carrera"
 * según sea el caso de acuerdo a la fila seleccionada (con un idCert > TOTAL_INITIAL_CERTIFICATES) de la tabla Certificados
 * donde TOTAL_INITIAL_CERTIFICATES es el número total de certificados iniciales
 * 
 * @param {object}
 * @return {string}
 */
function tempQuienFirma(certificadoSelected) {
  var noFirmaDecano = certificadoSelected.firmaSecretaria &&
    certificadoSelected.firmaGestor &&
    certificadoSelected.firmaDecano === false;
  if (noFirmaDecano) {
    return LIST_FUNCTIONARY_SIGNING[0];
  }
  var soloFirmaGestor = certificadoSelected.firmaGestor &&
    certificadoSelected.firmaSecretaria === false &&
    certificadoSelected.firmaDecano === false;
  if (soloFirmaGestor) {
    return LIST_FUNCTIONARY_SIGNING[1];
  }
}

/**
 * Devuelve la URL de la API para crear una instancia del proceso: Crear o Editar Certificado.
 *
 * @param {object}
 * @return {string}
 */
function urlCrearOEditarCertificadoProceso(certificadoSeleccionado) {
  if (certificadoSeleccionado && certificadoSeleccionado.length > 0) {
    return (
      "../API/bpm/process/" + certificadoSeleccionado[0].id + "/instantiation"
    );
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
function formErrorCrearOEditarCertificadoIncompleto(isEditing, certificado) {
  var certificateIncomplete = null
  if (isEditing) {
    var certificateIncomplete = !certificado.nombre || !certificado.descripcion || !certificado.auxQuienFirma;
    return certificateIncomplete;
  }

  certificateIncomplete = !certificado.idCert || !certificado.nombre || !certificado.descripcion;
  if (certificado.idCert > 4) {
    return (
      certificateIncomplete || !tempQuienFirma(certificado)
    );
  }
  return certificateIncomplete;
}

/**
 * Retorna los datos a enviar para rellenar el contrato.
 * 
 * @param {object}
 * @param {String}
 * @param {object}
 * @return {json}
 */
function getCertificadoPayload(contratoCertificadoNuevo, auxQuienFirma, objetoCertificado) {
  if (auxQuienFirma === LIST_FUNCTIONARY_SIGNING[0]) {
    contratoCertificadoNuevo.firmaSecretaria = true;
    contratoCertificadoNuevo.firmaGestor = true;
    contratoCertificadoNuevo.firmaDecano = false;
  } else if (auxQuienFirma === LIST_FUNCTIONARY_SIGNING[1]) {
    contratoCertificadoNuevo.firmaGestor = true;
    contratoCertificadoNuevo.firmaSecretaria = false;
    contratoCertificadoNuevo.firmaDecano = false;
  }

  var sizeListaObjCertificados = objetoCertificado.length;
  var idCertAutoIncremento = sizeListaObjCertificados + 1;
  contratoCertificadoNuevo.idCert = idCertAutoIncremento;

  return {
    contratoCertificadoNuevo: contratoCertificadoNuevo,
    contratoCertificadoEdit: {
      idCert: null,
      nombre: "",
      descripcion: "",
      firmaSecretaria: null,
      firmaGestor: null,
      firmaDecano: null,
    },
  };
}

/**
 * Retorna los datos a enviar para rellenar el contrato.
 *
 * @param {object}
 * @param {object}
 * @return {json}
 */
function getCertificadoEditPayload(certificadoEdit, certificadoSelected) {
  if (
    tempQuienFirma(certificadoSelected) === LIST_FUNCTIONARY_SIGNING[0]
  ) {
    certificadoEdit.firmaSecretaria = true;
    certificadoEdit.firmaGestor = true;
    certificadoEdit.firmaDecano = false;
  } else if (
    tempQuienFirma(certificadoSelected) === LIST_FUNCTIONARY_SIGNING[1]
  ) {
    certificadoEdit.firmaGestor = true;
    certificadoEdit.firmaSecretaria = false;
    certificadoEdit.firmaDecano = false;
  }
  return {
    contratoCertificadoEdit: {
      idCert: certificadoEdit.idCert,
      nombre: certificadoEdit.nombre,
      descripcion: certificadoEdit.descripcion,
      firmaSecretaria: certificadoEdit.firmaSecretaria,
      firmaGestor: certificadoEdit.firmaGestor,
      firmaDecano: certificadoEdit.firmaDecano,
    },
    contratoCertificadoNuevo: {
      idCert: null,
      nombre: "",
      descripcion: "",
      firmaSecretaria: null,
      firmaGestor: null,
      firmaDecano: null,
    },
  };
}

module.exports = {
  tempQuienFirma,
  urlCrearOEditarCertificadoProceso,
  formErrorCrearOEditarCertificadoIncompleto,
  getCertificadoPayload,
  getCertificadoEditPayload,
};
