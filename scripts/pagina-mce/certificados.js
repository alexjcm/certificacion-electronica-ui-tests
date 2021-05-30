const listaFuncionariosQueFirman = [
  "Firman la Secretaria y el Gestor",
  "Firma el Gestor",
];

/**
 * Este script ayuda a seleccionar automaticamente cualquier de las
 * siguientes opciones:
 *     - "Firma la Secretaria y el Gestor"
 *     - "Firma el Gestor"
 * según sea el caso de acuerdo a la fila seleccionada (con un idCert > 4) de la tabla Certificados.
 *
 * @return {string}
 */
function tempQuienFirma(objetoCertificado_selectedCopia) {
  var noFirmaDecano =
    objetoCertificado_selectedCopia.firmaSecretaria &&
    objetoCertificado_selectedCopia.firmaGestor &&
    objetoCertificado_selectedCopia.firmaDecano === false;
  if (noFirmaDecano) {
    return listaFuncionariosQueFirman[0];
  }
  var soloFirmaGestor =
    objetoCertificado_selectedCopia.firmaGestor &&
    objetoCertificado_selectedCopia.firmaSecretaria === false &&
    objetoCertificado_selectedCopia.firmaDecano === false;
  if (soloFirmaGestor) {
    return listaFuncionariosQueFirman[1];
  }
}

/**
 * Devuelve la URL de la API para crear una instancia del proceso: Crear Certificado Academico.
 *
 * @return {string}
 */
function urlCrearCertificadoProceso(crearOEditarCertificadoProceso) {
  if (
    crearOEditarCertificadoProceso &&
    crearOEditarCertificadoProceso.length > 0
  ) {
    return (
      "../API/bpm/process/" +
      crearOEditarCertificadoProceso[0].id +
      "/instantiation"
    );
  }
}

/**
 * Devuelve la URL de la API para crear una instancia del proceso: Editar Certificado Academico.
 *
 * @return {string}
 */
function urlEditarCertificadoProceso(crearOEditarCertificadoProceso) {
  if (
    crearOEditarCertificadoProceso &&
    crearOEditarCertificadoProceso.length > 0
  ) {
    return (
      "../API/bpm/process/" +
      crearOEditarCertificadoProceso[0].id +
      "/instantiation"
    );
  }
}

/**
 * Permite validar si todos los campos del formulario correspondiente han sido llenados,
 * retorna 'false' si todos los campos fueron llenados.
 * No tomamos en cuenta a 'idCert' porque en el 'getCertificadoPayload()' lo generamos
 * y seteamos localmente.
 *
 * @return {boolean}
 */
function formErrorCertificadoIncompleto(certificadosData) {
  var certIncompleto =
    !certificadosData.nombre ||
    !certificadosData.descripcion ||
    !certificadosData.auxQuienFirma;
  return certIncompleto;
}

/**
 * Permite validar si todos los campos del formulario correspondiente ha sido llenados,
 * retorna 'false' si todos los campos fueron llenados.
 *
 * @return {boolean}
 */
function formErrorEditarCertificadoIncompleto(objetoCertificado_selectedCopia) {
  var certEditImcompleto =
    !objetoCertificado_selectedCopia.idCert ||
    !objetoCertificado_selectedCopia.nombre ||
    !objetoCertificado_selectedCopia.descripcion;
  if (objetoCertificado_selectedCopia.idCert > 4) {
    return (
      certEditImcompleto || !tempQuienFirma(objetoCertificado_selectedCopia)
    );
  }
  return certEditImcompleto;
}

/**
 * Retorna los datos a enviar para rellenar el contrato.
 *
 * @param {object}
 * @return {json}
 */
function getCertificadoPayload(
  contratoCertificadoNuevo,
  auxQuienFirma,
  objetoCertificado
) {
  if (auxQuienFirma === listaFuncionariosQueFirman[0]) {
    contratoCertificadoNuevo.firmaSecretaria = true;
    contratoCertificadoNuevo.firmaGestor = true;
    contratoCertificadoNuevo.firmaDecano = false;
  } else if (auxQuienFirma === listaFuncionariosQueFirman[1]) {
    contratoCertificadoNuevo.firmaGestor = true;
    contratoCertificadoNuevo.firmaSecretaria = false;
    contratoCertificadoNuevo.firmaDecano = false;
  }

  var sizeListaObjCertificados = objetoCertificado.length;
  // Aumentamos en 1 el resultado anterior para obtener el idCert del futuro nuevo certificado
  var idCertAutoIncremento = sizeListaObjCertificados + 1;
  contratoCertificadoNuevo.idCert = idCertAutoIncremento;

  return {
    contratoCertificadoNuevo: contratoCertificadoNuevo,
    // se va a retornar tambien el sigiente contrato vacios porque esta funcion es para Crear certificados
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
 * @return {json}
 */
function getCertificadoEditPayload(
  certificadoEdit,
  objetoCertificado_selectedCopia
) {
  if (
    tempQuienFirma(objetoCertificado_selectedCopia) ===
    listaFuncionariosQueFirman[0]
  ) {
    certificadoEdit.firmaSecretaria = true;
    certificadoEdit.firmaGestor = true;
    certificadoEdit.firmaDecano = false;
  } else if (
    tempQuienFirma(objetoCertificado_selectedCopia) ===
    listaFuncionariosQueFirman[1]
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
    // Se va a retorna tambien  el siguiente contrato vacio porque esta funcion es para Editar certificados
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
  urlCrearCertificadoProceso,
  urlEditarCertificadoProceso,
  formErrorCertificadoIncompleto,
  formErrorEditarCertificadoIncompleto,
  getCertificadoPayload,
  getCertificadoEditPayload,
};
