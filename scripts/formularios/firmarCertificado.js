const constants = {
  URL_SERVER_PRE: "https://pruebasmce.info",
  URL_SERVER_PROD: "https://ciscunl.info",
  ABSOLUTE_PATH_DOCUMENTS: '/opt/wildfly-static/',
};

/**
 * Retorna los datos a enviar para rellenar el contrato.
 *
 * @param {string} Ruta absoluta del documento firmado.
 * @return {json} Contrato con la ruta absoluta del documento firmado.
 */
function getFirmarPayload(rutaExternaDelDocFirmado) {
  return {
    contratoUrlPdfFirmadoV1: rutaExternaDelDocFirmado,
  };
}

/**
 * Esta ruta parcial es generada para el futuro pdf que va a ser firmado,
 * es decir, dicho pdf aun no ha sido creado y por eso se le agrega al
 * nombre del doc. la terminacion -signed.pdf.
 *
 * @return {string}
 */
function rutaExternaDelDocFirmado(nombrePdf) {
  var nombrePdfAnterior = nombrePdf;
  var nuevoNombreDePdf = nombrePdfAnterior.replace(".pdf", "-signed.pdf");
  var rutaCompletaDeNuevoPdf = constants.ABSOLUTE_PATH_DOCUMENTS + nuevoNombreDePdf;

  // retorna una ruta como esta: /opt/wildfly-static/certificado-signed.pdf
  return rutaCompletaDeNuevoPdf;
}

/**
 * Función para generar el link que permite abrir la aplicación de FirmaEC
 * instalada en el computador del responsable de firmar.
 *
 * @return {string}
 */
function urlParaIniciarFirmaEC(valorVpTokenAEnviar, valorParametroEsProduccion,
  tipoCertSeleccionado
) {
  if (valorVpTokenAEnviar && valorParametroEsProduccion) {
    const nombreDelSistema = "mce";
    var miToken = valorVpTokenAEnviar.value;
    var tipoCertificado = "";
    var tipoEstampado = ""; // invisible
    if (tipoCertSeleccionado === "token") {
      tipoCertificado = "&tipo_certificado=1";
    } else if (tipoCertSeleccionado === "archivo") {
      tipoCertificado = "&tipo_certificado=2";
    }
    var linkGenerado = "";
    var isProduction = valorParametroEsProduccion.value;
    if (isProduction === "true") {
      const urlApiProd = "&url=" + constants.URL_SERVER_PROD + "/api";
      linkGenerado = "firmaec://" + nombreDelSistema +
        "/firmar?token=" + miToken +
        tipoCertificado +
        urlApiProd +
        tipoEstampado +
        "&pre=true";
    } else {
      const urlApiPre = "&url=" + constants.URL_SERVER_PRE + "/api";
      linkGenerado = "firmaec://" + nombreDelSistema +
        "/firmar?token=" + miToken +
        tipoCertificado +
        urlApiPre +
        tipoEstampado +
        "&pre=true";
    }

    return linkGenerado;
  }

  return null
}

/**
 * Esta url es generado para el futuro pdf que va a ser firmado,
 * es decir, dicho pdf aun no ha sido creado y por eso se le agrega al
 * nombre del doc. la terminacion -signed.pdf.
 *
 * @return {string}
 */
function urlExternaDelDocFirmado(nombrePdf) {
  var nombrePDFAnterior = nombrePdf;
  var nuevoNombreDePDF = nombrePDFAnterior.replace(".pdf", "-signed.pdf");
  var urlCompletaDeNuevoPDF = constants.URL_SERVER_PRE + "/static/" + nuevoNombreDePDF;

  // retorna una url como esta: https://pruebasmce.info/static/certificado-signed.pdf
  return urlCompletaDeNuevoPDF;
}

/**
 * Retorna la url del servidor anexado a la ruta del pdf adecuada
 * según sea el ambiente de Producción o Pre-preoducción.
 *
 * @return {string}
 */
function urlDirPDFAVerificar(valorParametroEsProduccion, rutaExternaDelDocFirmado) {
  if (valorParametroEsProduccion) {
    var esProduccion = valorParametroEsProduccion.value;
    var urlAux = "";
    if (esProduccion === "true") {
      urlAux = constants.URL_SERVER_PROD + "/recepcion/rest?dirpdf=" +
        rutaExternaDelDocFirmado;
    } else {
      urlAux = constants.URL_SERVER_PRE + "/recepcion/rest?dirpdf=" +
        rutaExternaDelDocFirmado;
    }

    // http://host:port/recepcion/rest?dirpdf=/opt/wildfly-static/cert-signed.pdf
    return urlAux;
  }
}

module.exports = {
  getFirmarPayload,
  rutaExternaDelDocFirmado,
  urlParaIniciarFirmaEC,
  urlExternaDelDocFirmado,
  urlDirPDFAVerificar
};
