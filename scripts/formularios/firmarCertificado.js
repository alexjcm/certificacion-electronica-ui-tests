const firmarData = {
  urlServidorPre: "http://localhost:8180",
  urlServidorProd: "http://190.96.96.153:7776",
  rutaAbsolutaDocs: '/opt/wildfly-static/',
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
  var rutaCompletaDeNuevoPdf = firmarData.rutaAbsolutaDocs + nuevoNombreDePdf;

  // retorna una ruta como esta: /opt/wildfly-static/certificado-signed.pdf
  return rutaCompletaDeNuevoPdf;
}

/**
 * Función para generar el link que permite abrir la aplicación de FirmaEC
 * instalada en el computador del responsable de firmar.
 *
 * @return {string}
 */
function urlParaIniciarFirmaEC(
  valorVpTokenAEnviar,
  valorParametroEsProduccion,
  tipoCertSeleccionado
) {
  if (valorVpTokenAEnviar && valorParametroEsProduccion) {
    const nombreDelSistema = "mce";
    var miToken = valorVpTokenAEnviar.value;
    var tipoCertificado = "";
    var tipoEstampado = ""; // invisible
    if (tipoCertSeleccionado && tipoCertSeleccionado === "token") {
      tipoCertificado = "&tipo_certificado=1";
    } else if (!tipoCertSeleccionado || tipoCertSeleccionado === "archivo") {
      tipoCertificado = "&tipo_certificado=2";
    }
    var linkGenerado = "";
    var isProduction = valorParametroEsProduccion.value;
    if (isProduction === "true") {
      // URL PRODUCCION
      const urlApiProd = "&url=" + firmarData.urlServidorProd + "/api";
      linkGenerado =
        "firmaec://" +
        nombreDelSistema +
        "/firmar?token=" +
        miToken +
        tipoCertificado +
        urlApiProd +
        tipoEstampado +
        "&pre=true";
    } else {   
      const urlApiPre = "&url=" + firmarData.urlServidorPre + "/api";
      linkGenerado =
        "firmaec://" +
        nombreDelSistema +
        "/firmar?token=" +
        miToken +
        tipoCertificado +
        urlApiPre +
        tipoEstampado +
        "&pre=true";
    }

    // firmaec://mce/firmar?token=XXXXXXXX&tipo_certificado=2&url=http://....&pre=true
    return linkGenerado;
  }
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
  // Se usa urlServidorPre porque en este caso funciona para cualquier entorno.
  var urlCompletaDeNuevoPDF =
    firmarData.urlServidorPre + "/static/" + nuevoNombreDePDF;
  // retorna una url como esta: http://localhost:8180/static/certificado-signed.pdf

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
      urlAux =
        firmarData.urlServidorProd +
        "/recepcion/rest?dirpdf=" +
        rutaExternaDelDocFirmado;
    } else {
      urlAux =
        firmarData.urlServidorPre +
        "/recepcion/rest?dirpdf=" +
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
