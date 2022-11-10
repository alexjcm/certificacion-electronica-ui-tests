const fechasValid = require("../scripts/formularios/generarCertificado");
const getPayload = require("../scripts/formularios/verPdfGenerado");
const {
  getChangeButtonLabel,
  getChangeTagComentarios,
  getRevisionSolicitudPayload,
} = require("../scripts/formularios/revisionDeSolicitud");
const {
  getFirmarPayload,
  rutaExternaDelDocFirmado,
  urlParaIniciarFirmaEC,
  urlExternaDelDocFirmado,
  urlDirPDFAVerificar,
} = require("../scripts/formularios/firmarCertificado");


//"d 'de' MMMM 'de' yyyy"

describe(" Pruebas unitarias: Fechas de formulario generar certificado", () => {
  test("Fecha de incio es menor a fecha Fin", () => {
    expect(fechasValid("2021-10-18", "2021-10-19")).toBeTruthy();
    expect(fechasValid("Aug 9, 1995", "Aug 10, 1995")).toBeTruthy();
    expect(fechasValid("1995/01/01", "1996/02/17")).toBeTruthy();
    expect(fechasValid("2018/01/30 23:30:14", "2018/01/30 23:30:15")
    ).toBeTruthy();
    expect(fechasValid("2021-05-29T02:40:56.328Z", "2021-05-29T02:40:56.330Z")
    ).toBeTruthy();
    expect(fechasValid("Fri Aug 23 2018 00:23:31 GMT+0100",
      "Fri Aug 24 2018 00:23:31 GMT+0100"
    )).toBeTruthy();
  });
  test("Fecha de incio es mayor o igual a fecha Fin", () => {
    expect(fechasValid("2021-10-19", "2021-10-18")).toBeFalsy();
    expect(fechasValid("lunes, 27 de diciembre de 2050",
      "lunes, 27 de diciembre de 2050"
    )).toBeFalsy();
    expect(fechasValid("1996/02/17", "1995-01-01")).toBeFalsy();
    expect(fechasValid("2018/01/30 23:30:14", "2018/01/30 23:30:12")
    ).toBeFalsy();
    expect(fechasValid("2021-05-29T02:40:56.300Z", "2021-05-29T02:40:56.300Z")
    ).toBeFalsy();
    expect(fechasValid("Fri Aug 25 2018 00:23:31 GMT+0100",
      "Fri Aug 24 2018 00:23:31 GMT+0100"
    )).toBeFalsy();
  });
});

describe(" Pruebas unitarias: Formulario solicitar certificado académico", () => {
  test("Payload contiene lo esperado", () => {
    var result = getPayload("Generado").contratoEstadoPDF;
    expect(result).toBe("Generado");
    result = getPayload("Regenerar").contratoEstadoPDF;
    expect(result).toBe("Regenerar");
  });
});

describe(" Pruebas unitarias: Formulario revisión de la solicitud", () => {
  test("Etiqueta de comentario es correcta", () => {
    var res = getChangeTagComentarios("Rechazada");
    expect(res).toBe("Comentario");
    res = getChangeTagComentarios("Aprobada");
    expect(res).toBe("Comentario (opcional)");
  });

  test("Texto presentado en botón es correcto", () => {
    var res = getChangeButtonLabel("Aprobada");
    expect(res).toBe("Aprobar");
    res = getChangeButtonLabel("Rechazada");
    expect(res).toBe("Rechazar");
  });

  test("Payload a enviar es correcto", () => {
    var res = getRevisionSolicitudPayload("Aprobada", "abc");
    var aux = {
      contratoEstado: "aprobada",
      contratoComentario: "abc",
    };
    expect(res.contratoEstado).toBe(aux.contratoEstado);
    expect(res.contratoComentario).toBe(aux.contratoComentario);
  });
});

describe(" Pruebas unitarias: Formulario firmar certificado académico", () => {
  test("Payload a enviar contiene lo esperado", () => {
    var res = getFirmarPayload("/opt/directory");
    expect(res.contratoUrlPdfFirmadoV1).toBe("/opt/directory");
  });

  test("Se recibe la ruta esperada", () => {
    var ruta = "/opt/wildfly-static/";
    var res = rutaExternaDelDocFirmado("ejemplo.pdf");
    expect(res).toBe(ruta + "ejemplo-signed.pdf");
  });

  test("Se recibe la url esperada que inicia la aplicación FirmaEC", () => {
    const url = "https://pruebasmce.info";
    var tokenAEnviar = { value: "xxxxxxxxxxxxxxxxxxxxxxx" };
    var parametroEsProduccion = { value: "false" };
    var tipoCertSeleccionado = "archivo";
    var res = urlParaIniciarFirmaEC(tokenAEnviar, parametroEsProduccion, tipoCertSeleccionado
    );

    const urlEsperada = "firmaec://mce/firmar?token=" + tokenAEnviar.value + "&tipo_certificado=2&url=" +
      url + "/api" + "&pre=true";
    expect(res).toBe(urlEsperada);
  });

  test("Se recibe la url correcta del documento", () => {
    var url = "https://pruebasmce.info";
    var res = urlExternaDelDocFirmado("ejemplo.pdf");
    expect(res).toBe(url + "/static/" + "ejemplo-signed.pdf");
  });

  test("Se recibe la url correcta del pdf a verificar", () => {
    var url = "https://pruebasmce.info";
    var parametroEsProduccion = { value: "false" };
    var rutaExternaDelDocFirmado = "/opt/wildfly-static/certificado-signed.pdf";
    var res = urlDirPDFAVerificar(parametroEsProduccion, rutaExternaDelDocFirmado
    );
    const urlEsperada =
      url + "/recepcion/rest?dirpdf=" + rutaExternaDelDocFirmado;
    expect(res).toBe(urlEsperada);
  });
});
