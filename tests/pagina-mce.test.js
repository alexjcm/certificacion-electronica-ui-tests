const {
  getCreateOrEditParamPayload,
  formErrorParametroCrearOEditarIncompleto,
} = require("../scripts/pagina-mce/prerrequisitos");
const {
  urlCrearOEditarEventoProceso,
  formErrorEventoCrearOEditarIncompleto,
  getEventoPayload,
  getEventoEditPayload,
} = require("../scripts/pagina-mce/eventos");
const {
  quienFirma,
  urlCrearOEditarCertificadoProceso,
  formErrorCrearOEditarCertificadoIncompleto,
  getCertificadoPayload,
  getCertificadoEditPayload,
} = require("../scripts/pagina-mce/certificados");

describe(" Pruebas unitarias: Página MCE - prerrequisitos", () => {
  test("Formulario prerrequisitos create error", () => {
    var contratoLleno = {
      id: 22,
      nombre: "alfa",
      valor: "beta",
      descripcion: "gamma",
      contieneInfoSensible: true,
    };
    var contratoIncompleto = {
      id: null,
      nombre: "",
      valor: "",
      descripcion: "gamma",
      contieneInfoSensible: true,
    };
    var res = formErrorParametroCrearOEditarIncompleto(false, contratoLleno);
    expect(res).toBeFalsy();
    res = formErrorParametroCrearOEditarIncompleto(false, contratoIncompleto);
    expect(res).toBeTruthy();
  });

  test("Formulario prerrequisitos edit error", () => {
    var contratoLleno = {
      id: 4,
      nombre: "alfa",
      valor: "beta",
      descripcion: "gamma",
      contieneInfoSensible: false,
      persistenceId: 123,
    };
    var contratoIncompleto = {
      id: null,
      nombre: "",
      valor: "",
      descripcion: "gamma",
      contieneInfoSensible: false,
      persistenceId: null,
    };
    var res = formErrorParametroCrearOEditarIncompleto(true, contratoLleno);
    expect(res).toBeFalsy();
    res = formErrorParametroCrearOEditarIncompleto(true, contratoIncompleto);
    expect(res).toBeTruthy();
  });

  test("Payload a enviar contiene lo esperado", () => {
    var contratoParam = {
      id: 4,
      nombre: "alfa",
      valor: "beta",
      descripcion: "gamma",
      contieneInfoSensible: false,
      persistenceId: 123,
    };
    var res = getCreateOrEditParamPayload(contratoParam);
    expect(res.contratoParametro).toEqual(contratoParam);

    contratoParam.persistenceId = null
    res = getCreateOrEditParamPayload(contratoParam);
    expect(res.contratoParametro).toEqual(contratoParam);
  });
});

describe(" Pruebas unitarias: Página MCE - eventos", () => {
  test("Se recibe la url esperada ", () => {
    var crearOEditarEventoProceso = [{ id: "1234" }];
    var res = urlCrearOEditarEventoProceso(crearOEditarEventoProceso);
    var esperado =
      "../API/bpm/process/" +
      crearOEditarEventoProceso[0].id +
      "/instantiation";
    expect(res).toBe(esperado);
  });

  test("Formularo evento  error", () => {
    var contratoLleno = {
      nombre: "alfa",
      tematica: "beta",
      lugar: "gamma",
      horas: 23,
      fechaDeInicio: "2021-12-01",
      fechaDeFinalizacion: "2021-12-03",
    };
    var contratoIncompleto = {
      nombre: "",
      tematica: "beta",
      lugar: "gamma",
      horas: 23,
      fechaDeInicio: null,
      fechaDeFinalizacion: "2021-12-03",
    };
    var res = formErrorEventoCrearOEditarIncompleto(false, contratoLleno);
    expect(res).toBeFalsy();
    res = formErrorEventoCrearOEditarIncompleto(false, contratoIncompleto);
    expect(res).toBeTruthy();
  });

  test("Formulario evento edit error", () => {
    var contratoLleno = {
      nombre: "alfa",
      tematica: "beta",
      lugar: "gamma",
      horas: 23,
      fechaDeInicio: "2021-12-01",
      fechaDeFinalizacion: "2021-12-03",
      persistenceId_string: "123",
    };
    var contratoIncompleto = {
      nombre: "",
      tematica: "beta",
      lugar: "gamma",
      horas: 23,
      fechaDeInicio: null,
      fechaDeFinalizacion: "2021-12-03",
      persistenceId_string: "123",
    };
    var res = formErrorEventoCrearOEditarIncompleto(true, contratoLleno);
    expect(res).toBeFalsy();
    res = formErrorEventoCrearOEditarIncompleto(true, contratoIncompleto);
    expect(res).toBeTruthy();
  });

  test("Payload contiene lo esperado 1", () => {
    var contratoEvento = {
      nombre: "",
      tematica: "",
      lugar: "",
      horas: null,
      fechaDeInicio: null,
      fechaDeFinalizacion: null,
    };
    var res = getEventoPayload(contratoEvento);
    expect(res.contratoEventoInput).toEqual(contratoEvento);
    expect(res.contratoEventoPersistenceId).toBeNull;
  });

  test("Payload contiene lo esperado 2", () => {
    var contratoEvento = {
      nombre: "alfa",
      tematica: "betta",
      lugar: "gamma",
      horas: 10,
      fechaDeInicio: "2022-01-05",
      fechaDeFinalizacion: "2022-01-07",
    };
    var res = getEventoEditPayload(contratoEvento);
    expect(res.contratoEventoEdit).toEqual(contratoEvento);

    Object.defineProperty(contratoEvento, "persistenceId_string", {
      value: "delta",
    });
    res = getEventoEditPayload(contratoEvento);
    expect(res.contratoEventoPersistenceId).toEqual(
      contratoEvento.persistenceId_string
    );
  });
});

describe(" Pruebas unitarias: Página MCE - certificados", () => {
  test("Contiene los funcionarios encargados de firmar correctos", () => {
    const LIST_FUNCTIONARY_SIGNING = [
      "Firman la Secretaria y el Gestor",
      "Firma el Gestor",
    ];
    var certificadoSelected = {
      firmaSecretaria: false,
      firmaGestor: true,
      firmaDecano: false,
    };

    var res = quienFirma(certificadoSelected);
    expect(res).toBe(LIST_FUNCTIONARY_SIGNING[1]);
    certificadoSelected = {
      firmaSecretaria: true,
      firmaGestor: true,
      firmaDecano: false,
    };
    res = quienFirma(certificadoSelected);
    expect(res).toBe(LIST_FUNCTIONARY_SIGNING[0]);
  });

  test("Contiene la url correcta", () => {
    var crearOEditarCertificadoProceso = [{ id: "123" }];
    var res = urlCrearOEditarCertificadoProceso(crearOEditarCertificadoProceso);
    var esperado = "../API/bpm/process/" + crearOEditarCertificadoProceso[0].id +
      "/instantiation";
    expect(res).toBe(esperado);
  });

  test("Formulario certificado error", () => {
    var certificado = {
      nombre: "alfa",
      descripcion: "beta",
      idCert: 5,
      firmaSecretaria: false,
      firmaGestor: true,
      firmaDecano: false,
    };
    var res = formErrorCrearOEditarCertificadoIncompleto(false, certificado);
    expect(res).toBeFalsy();

    certificado.idCert = 4
     res = formErrorCrearOEditarCertificadoIncompleto(false, certificado);
    expect(res).toBeFalsy();
  });

  test("Formulario certificado edit error", () => {
    var certificado = {
      nombre: "alfa",
      descripcion: "beta",
      idCert: 4,
      firmaSecretaria: false,
      firmaGestor: true,
      firmaDecano: false,
      auxQuienFirma: true
    };
    var res = formErrorCrearOEditarCertificadoIncompleto(true,
      certificado
    );
    expect(res).toBeFalsy();
  });

  test("Payload contiene lo esperado 1 ", () => {
    var contratoCertificadoNuevo = {
      idCert: 5,
      nombre: "alfa",
      descripcion: "beta",
      firmaSecretaria: true,
      firmaGestor: true,
      firmaDecano: false,
    };
    var responsableDeFirmar = "Firman la Secretaria y el Gestor";
    var listaCertiicados = [0, 0, 0, 0];
    var res = getCertificadoPayload(
      contratoCertificadoNuevo,
      responsableDeFirmar,
      listaCertiicados
    );
    expect(res.contratoCertificadoNuevo).toEqual(contratoCertificadoNuevo);
    expect(res.contratoCertificadoEdit.idCert).toBeNull();

    responsableDeFirmar = "Firma el Gestor";
    res = getCertificadoPayload(
      contratoCertificadoNuevo,
      responsableDeFirmar,
      listaCertiicados
    );
    expect(res.contratoCertificadoNuevo).toEqual(contratoCertificadoNuevo);
    expect(res.contratoCertificadoEdit.idCert).toBeNull();
  });

  test("Payload contiene lo esperado 2", () => {
    var certificadoEdit = {
      idCert: 5,
      nombre: "alfa",
      descripcion: "beta",
      firmaSecretaria: null,
      firmaGestor: null,
      firmaDecano: null,
    };
    var certificadoSelected = {
      idCert: 5,
      nombre: "alfa",
      descripcion: "beta",
      firmaSecretaria: true,
      firmaGestor: true,
      firmaDecano: false,
    };
    var res = getCertificadoEditPayload(
      certificadoEdit,
      certificadoSelected
    );

    expect(res.contratoCertificadoEdit).toEqual(certificadoSelected);
    expect(res.contratoCertificadoNuevo.idCert).toBeNull();

    certificadoSelected.firmaSecretaria = false
    res = getCertificadoEditPayload(
      certificadoEdit,
      certificadoSelected
    );

    expect(res.contratoCertificadoEdit).toEqual(certificadoSelected);
    expect(res.contratoCertificadoNuevo.idCert).toBeNull();
  });
});
