const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const Producto = require("./producto.model");
class Comercio {
  constructor(fk_idUsuario, nombre, cuit, direccion) {
    this.idComercio = uuidv4();
    this.nombre = nombre;
    this.cuit = cuit;
    this.direccion = direccion;
    this.fk_idUsuario = fk_idUsuario;
    this.productos = [];
  }

  static fromJSONtoObjectComercio(dataComercio) {
    let nuevoComercio = new Comercio(
      dataComercio.idComercio,
      dataComercio.nombre,
      dataComercio.cuit,
      dataComercio.direccion,
      dataComercio.fk_idUsuario
    );
    console.log(nuevoComercio);
    return nuevoComercio;
  }
}
function guardarComercio(idUsuario, dataBody) {
  console.log(dataBody);
  const comercioNuevo = new Comercio(
    idUsuario,
    dataBody.nombre,
    dataBody.cuit,
    dataBody.direccion
  );
  console.log(comercioNuevo);
  let comerciosRegistrados = obtenerObjetosBD(
    "../Backend/src/db/comercios.txt"
  );
  console.log(comerciosRegistrados);
  comerciosRegistrados.push(comercioNuevo);
  escribirObjetosBD("../Backend/src/db/comercios.txt", comerciosRegistrados);

  return comercioNuevo;
}
function tomarComercioPorId(idComercio) {
  console.log(idComercio);
  try {
    let comerciosRegistrados = obtenerObjetosBD(
      "../Backend/src/db/comercios.txt"
    );
    console.log(comerciosRegistrados);
    //recorremos los objetos "comercio" dentro de la coleccion de ususarios registrados
    for (comercio of comerciosRegistrados) {
      console.log(comercio);
      if (comercio.idComercio === idComercio) {
        return comercio;
      }
    }
  } catch (error) {
    console.log(
      error + "/nel comercio con el id " + idComercio + " no se encontró"
    );
  }
}

function agregarProducto(ProductoData) {
  const productoNuevo = new Producto(...ProductoData);
  this.productos.push(productoNuevo);

  comerciosRegistrados.push(comercioNuevoNuevo);
  escribirObjetosBD("../db/comercios.txt", comercioNuevo);

  return comercioNuevo;
}

//Metodos para consultar bd. path-> ruta del archivo .txt--------------------------------------------------------
function obtenerObjetosBD(path) {
  let stringDeObjetos = fs.readFileSync(path, "utf-8");
  if (!stringDeObjetos.trim()) {
    console.log("El archivo está vacío.");
    return []; // Retorna un array vacío cuando aun no se cargan productos
  }
  let objetosEnBD = JSON.parse(stringDeObjetos);

  return objetosEnBD;
}

function escribirObjetosBD(path, objeto) {
  if (!path || !objeto) {
    return false;
  }
  fs.writeFileSync(path, JSON.stringify(objeto));
  return true;
}
//obtiene los comercios almacenados en la bd y los devuelve
function getComercios() {
  try {
    let comerciosRegistrados = obtenerObjetosBD(
      "../backend/src/db/comercios.txt"
    );

    return comerciosRegistrados;
  } catch (error) {
    console.error("Error al leer o parsear el archivo de comercios:", error);
    return [];
  }
}

function eliminarComercio(idComercio) {
  try {
    let comerciosRegistrados = obtenerObjetosBD(
      "../backend/src/db/comercios.txt"
    );

    comerciosRegistrados.filter((comercio) => {
      return comercio.idComercio === idComercio ? usuario : [];
    });
    escribirObjetosBD(comerciosRegistrados);
    return comerciosRegistrados;
  } catch (error) {
    return new Error({ message: "error al eliminar" });
  }
}
module.exports = {
  guardarComercio,
  tomarComercioPorId,
  getComercios,
  eliminarComercio,
  agregarProducto,
};
