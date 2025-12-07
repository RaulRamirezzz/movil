// ==========================================
//  F A K E   B A C K E N D   Z E G N A L
// ==========================================

// Base de datos simulada

let pendientes = [
  {
    consecutivo: 1,
    numeroDocumento: "001",
    codigoCliente: "C20000",
    nombreCliente: "Norm Thompson",
    tipoDocumento: "Factura",
    fechaDocumento: "2025-09-01",
    fechaEntrega: "2025-09-05",
    diasAtraso: 4
  },
  {
    consecutivo: 2,
    numeroDocumento: "002",
    codigoCliente: "C30000",
    nombreCliente: "Microchips",
    tipoDocumento: "Factura",
    fechaDocumento: "2025-08-25",
    fechaEntrega: "2025-08-25",
    diasAtraso: 0
  },
  {
    consecutivo: 3,
    numeroDocumento: "003",
    codigoCliente: "C15010",
    nombreCliente: "Tecnologías Nova",
    tipoDocumento: "Entrega",
    fechaDocumento: "2025-07-10",
    fechaEntrega: "2025-07-15",
    diasAtraso: 12
  },
  {
    consecutivo: 4,
    numeroDocumento: "004",
    codigoCliente: "C88900",
    nombreCliente: "LogiSoft",
    tipoDocumento: "Factura",
    fechaDocumento: "2025-09-02",
    fechaEntrega: "2025-09-06",
    diasAtraso: 3
  },
  {
    consecutivo: 5,
    numeroDocumento: "005",
    codigoCliente: "C54020",
    nombreCliente: "Parameter Technology",
    tipoDocumento: "Entrega",
    fechaDocumento: "2025-08-10",
    fechaEntrega: "2025-08-12",
    diasAtraso: 18
  },
  {
    consecutivo: 6,
    numeroDocumento: "006",
    codigoCliente: "C22310",
    nombreCliente: "Soluciones Atlas",
    tipoDocumento: "Factura",
    fechaDocumento: "2025-06-21",
    fechaEntrega: "2025-06-25",
    diasAtraso: 65
  },
  {
    consecutivo: 7,
    numeroDocumento: "007",
    codigoCliente: "C87100",
    nombreCliente: "Distribuciones Rápidas",
    tipoDocumento: "Entrega",
    fechaDocumento: "2025-08-01",
    fechaEntrega: "2025-08-03",
    diasAtraso: 30
  },
  {
    consecutivo: 8,
    numeroDocumento: "008",
    codigoCliente: "C99800",
    nombreCliente: "Mega Logistics",
    tipoDocumento: "Factura",
    fechaDocumento: "2025-07-05",
    fechaEntrega: "2025-07-10",
    diasAtraso: 20
  },
  {
    consecutivo: 9,
    numeroDocumento: "009",
    codigoCliente: "C71300",
    nombreCliente: "Herramientas Ramírez",
    tipoDocumento: "Traslado",
    fechaDocumento: "2025-09-03",
    fechaEntrega: "2025-09-04",
    diasAtraso: 1
  },
  {
    consecutivo: 10,
    numeroDocumento: "010",
    codigoCliente: "C58110",
    nombreCliente: "ElectroMaster",
    tipoDocumento: "Factura",
    fechaDocumento: "2025-09-01",
    fechaEntrega: "2025-09-05",
    diasAtraso: 4
  },
  {
    consecutivo: 11,
    numeroDocumento: "011",
    codigoCliente: "C40200",
    nombreCliente: "Textiles Riviera",
    tipoDocumento: "Factura",
    fechaDocumento: "2025-08-05",
    fechaEntrega: "2025-08-06",
    diasAtraso: 24
  },
  {
    consecutivo: 12,
    numeroDocumento: "012",
    codigoCliente: "C99010",
    nombreCliente: "Proveedora del Norte",
    tipoDocumento: "Entrega",
    fechaDocumento: "2025-08-12",
    fechaEntrega: "2025-08-17",
    diasAtraso: 10
  },
  {
    consecutivo: 13,
    numeroDocumento: "013",
    codigoCliente: "C20400",
    nombreCliente: "Industrias Montoya",
    tipoDocumento: "Factura",
    fechaDocumento: "2025-06-02",
    fechaEntrega: "2025-06-07",
    diasAtraso: 80
  },
  {
    consecutivo: 14,
    numeroDocumento: "014",
    codigoCliente: "C35040",
    nombreCliente: "Transportes Vega",
    tipoDocumento: "Traslado",
    fechaDocumento: "2025-07-14",
    fechaEntrega: "2025-07-17",
    diasAtraso: 50
  },
  {
    consecutivo: 15,
    numeroDocumento: "015",
    codigoCliente: "C44300",
    nombreCliente: "Farmacias Central",
    tipoDocumento: "Entrega",
    fechaDocumento: "2025-08-19",
    fechaEntrega: "2025-08-20",
    diasAtraso: 15
  },
  {
    consecutivo: 16,
    numeroDocumento: "016",
    codigoCliente: "C55500",
    nombreCliente: "Casa Industrial",
    tipoDocumento: "Factura",
    fechaDocumento: "2025-09-04",
    fechaEntrega: "2025-09-06",
    diasAtraso: 0
  },
  {
    consecutivo: 17,
    numeroDocumento: "017",
    codigoCliente: "C77290",
    nombreCliente: "Grupo Ferrum",
    tipoDocumento: "Factura",
    fechaDocumento: "2025-07-30",
    fechaEntrega: "2025-08-01",
    diasAtraso: 34
  },
  {
    consecutivo: 18,
    numeroDocumento: "018",
    codigoCliente: "C82700",
    nombreCliente: "Alimentos Frescos MX",
    tipoDocumento: "Entrega",
    fechaDocumento: "2025-09-01",
    fechaEntrega: "2025-09-05",
    diasAtraso: 4
  },
  {
    consecutivo: 19,
    numeroDocumento: "019",
    codigoCliente: "C61910",
    nombreCliente: "Centro Papelero",
    tipoDocumento: "Traslado",
    fechaDocumento: "2025-08-10",
    fechaEntrega: "2025-08-11",
    diasAtraso: 22
  },
  {
    consecutivo: 20,
    numeroDocumento: "020",
    codigoCliente: "C40090",
    nombreCliente: "Tecnología Global",
    tipoDocumento: "Factura",
    fechaDocumento: "2025-07-28",
    fechaEntrega: "2025-07-30",
    diasAtraso: 39
  }
];


// 🔥 Esta es la tabla donde se guardan CARGADOS + EN RUTA
let cargadosYRuta = [];

// Delay simulado
const wait = (ms) => new Promise(res => setTimeout(res, ms));

export const fakeBackend = {

  // -----------------------------------------------------
  // 1) DOCUMENTOS PENDIENTES
  // -----------------------------------------------------
  getDocumentosPendientes: async () => {
    await wait(300);

    return {
      estatus: 2,
      descripcion: "Listado exitoso",
      documentos: pendientes
    };
  },

  // -----------------------------------------------------
  // 2) AGREGAR A CARGADOS (POST /seleccion)
  // -----------------------------------------------------
  cargarDocumentos: async (consecutivos) => {
    await wait(300);

    const docs = pendientes.filter(d => consecutivos.includes(d.consecutivo));

    if (docs.length === 0) {
      return { estatus: -1, descripcion: "No se encontraron documentos" };
    }

    docs.forEach(doc => {
      cargadosYRuta.push({
        ...doc,
        estadoDocumento: "Cargado"
      });
    });

    // quitar de pendientes
    pendientes = pendientes.filter(d => !consecutivos.includes(d.consecutivo));

    return { estatus: 2, descripcion: "Documentos agregados a la ruta" };
  },

  // -----------------------------------------------------
  // 3) OBTENER DOCUMENTOS CARGADOS + EN RUTA (TABLA ÚNICA)
  // -----------------------------------------------------
  getDocumentosRuta: async () => {
    await wait(200);

    return {
      estatus: 2,
      descripcion: "Listado exitoso",
      documentos: cargadosYRuta
    };
  },

  // -----------------------------------------------------
  // 4) INICIAR RUTA (solo cambia el estado)
  // -----------------------------------------------------
  iniciarRuta: async (consecutivo) => {
    await wait(300);

    const doc = cargadosYRuta.find(d => d.consecutivo === consecutivo);

    if (!doc) {
      return { estatus: -1, descripcion: "Documento no encontrado en cargados" };
    }

    doc.estadoDocumento = "En ruta";

    return {
      estatus: 2,
      descripcion: `Documento ${consecutivo} en ruta`
    };
  },

  // -----------------------------------------------------
  // 5) ENTREGAR DOCUMENTO (lo elimina de la tabla)
  // -----------------------------------------------------
  entregarDocumento: async (consecutivo) => {
    await wait(300);

    const existe = cargadosYRuta.find(d => d.consecutivo === consecutivo);

    if (!existe) {
      return { estatus: -1, descripcion: "Documento no está en ruta" };
    }

    // eliminar
    cargadosYRuta = cargadosYRuta.filter(d => d.consecutivo !== consecutivo);

    return {
      estatus: 2,
      descripcion: "Documento entregado correctamente"
    };
  },

  // -----------------------------------------------------
  // 6) REINICIAR DATOS (para pruebas, opcional)
  // -----------------------------------------------------
  reset: () => {
    cargadosYRuta = [];
  }
};
