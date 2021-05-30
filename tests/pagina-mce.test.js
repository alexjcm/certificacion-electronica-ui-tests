const {
  getCancelarSolicitudPayload,
  urlIniciarCancelarProceso,
  urlIniciarProcesoNuevo,
} = require("../scripts/pagina-mce/solicitudes");
const {
  urlCrearEventoProceso,
  urlEditarEventoProceso,
  formErrorEventoIncompleto,
  formErrorEventoEditarIncompleto,
  getEventoPayload,
  getEventoEditPayload,
} = require("../scripts/pagina-mce/eventos");
const {
  tempQuienFirma,
  urlCrearCertificadoProceso,
  urlEditarCertificadoProceso,
  formErrorCertificadoIncompleto,
  formErrorEditarCertificadoIncompleto,
  getCertificadoPayload,
  getCertificadoEditPayload,
} = require("../scripts/pagina-mce/certificados");

//**************************************************************
describe(" Pruebas unitarias: Página MCE - solicitudes", () => {
  test("Payload contiene lo esperado", () => {
    const contrato = { persistenceId_string: "1234" };
    const res = getCancelarSolicitudPayload(contrato);
    expect(res).toEqual({
      contratoIdSolicitudDeCetificado: "1234",
    });
  });

  test("Se recibe la url esperada", () => {
    var cancelarProceso = [{ id: "1234" }];
    var res = urlIniciarCancelarProceso(cancelarProceso);
    var esperado =
      "../API/bpm/process/" + cancelarProceso[0].id + "/instantiation";
    expect(res).toBe(esperado);
  });

  test("Se recibe la url esperada 2", () => {
    var crearProceso = [{ name: "0", version: "1", id: "3" }];
    var res = urlIniciarProcesoNuevo(crearProceso);
    var esperado =
      "/bonita/portal/resource/process/" +
      crearProceso[0].name +
      "/" +
      crearProceso[0].version +
      "/content/?id=" +
      crearProceso[0].id;

    expect(res).toBe(esperado);
  });
});

describe(" Pruebas unitarias: Página MCE - eventos", () => {
  test("Se recibe la url esperada 1 ", () => {
    var crearOEditarEventoProceso = [{ id: "1234" }];
    var res = urlCrearEventoProceso(crearOEditarEventoProceso);
    var esperado =
      "../API/bpm/process/" +
      crearOEditarEventoProceso[0].id +
      "/instantiation";
    expect(res).toBe(esperado);
  });

  test("Se recibe la url esperada 2", () => {
    var crearOEditarEventoProceso = [{ id: "1234" }];
    var res = urlEditarEventoProceso(crearOEditarEventoProceso);
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
    var res = formErrorEventoIncompleto(contratoLleno);
    expect(res).toBeFalsy();
    res = formErrorEventoIncompleto(contratoIncompleto);
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
    var res = formErrorEventoEditarIncompleto(contratoLleno);
    expect(res).toBeFalsy();
    res = formErrorEventoEditarIncompleto(contratoIncompleto);
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
    var esperado = 2;
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

    //Agregamos la propiedad persistenceId_string al objeto
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
    const listaFuncionariosQueFirman = [
      "Firman la Secretaria y el Gestor",
      "Firma el Gestor",
    ];
    var objetoCertificado_selectedCopia = {
      firmaSecretaria: false,
      firmaGestor: true,
      firmaDecano: false,
    };

    var res = tempQuienFirma(objetoCertificado_selectedCopia);
    expect(res).toBe(listaFuncionariosQueFirman[1]);
    objetoCertificado_selectedCopia = {
      firmaSecretaria: true,
      firmaGestor: true,
      firmaDecano: false,
    };
    res = tempQuienFirma(objetoCertificado_selectedCopia);
    expect(res).toBe(listaFuncionariosQueFirman[0]);
  });

  test("Contiene la url correcta 1", () => {
    var crearOEditarCertificadoProceso = [{ id: "abc" }];
    var res = urlCrearCertificadoProceso(crearOEditarCertificadoProceso);
    var esperado =
      "../API/bpm/process/" +
      crearOEditarCertificadoProceso[0].id +
      "/instantiation";
    expect(res).toBe(esperado);
  });

  test("Contiene la url correcta 2", () => {
    var crearOEditarCertificadoProceso = [{ id: "123" }];
    var res = urlEditarCertificadoProceso(crearOEditarCertificadoProceso);
    var esperado =
      "../API/bpm/process/" +
      crearOEditarCertificadoProceso[0].id +
      "/instantiation";
    expect(res).toBe(esperado);
  });

  test("Formulario certificado error", () => {
    var certificadosData = {
      nombre: "alfa",
      descripcion: "beta",
      auxQuienFirma: true,
    };
    var res = formErrorCertificadoIncompleto(certificadosData);
    expect(res).toBeFalsy();
  });

  test("Formulario certificado edit error", () => {
    var objetoCertificado_selectedCopia = {
      nombre: "alfa",
      descripcion: "beta",
      idCert: 5,
      firmaSecretaria: false,
      firmaGestor: true,
      firmaDecano: false,
    };
    var res = formErrorEditarCertificadoIncompleto(
      objetoCertificado_selectedCopia
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
    var auxQuienFirma = "Firman la Secretaria y el Gestor";
    var objetoCertificado = [0, 0, 0, 0];
    var res = getCertificadoPayload(
      contratoCertificadoNuevo,
      auxQuienFirma,
      objetoCertificado
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
    var objetoCertificado_selectedCopia = {
      idCert: 5,
      nombre: "alfa",
      descripcion: "beta",
      firmaSecretaria: true,
      firmaGestor: true,
      firmaDecano: false,
    };
    var res = getCertificadoEditPayload(
      certificadoEdit,
      objetoCertificado_selectedCopia
    );

    expect(res.contratoCertificadoEdit).toEqual(objetoCertificado_selectedCopia);
    expect(res.contratoCertificadoNuevo.idCert).toBeNull();
  });
});
