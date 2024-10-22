const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

class Comercio {
  constructor(fk_idUsuario, nombre, cuit, direccion) {
    this.idComercio = uuidv4();
    this.nombre = nombre;
    this.cuit = cuit;
    this.direccion = direccion;
    this.fk_idUsuario = fk_idUsuario;
    this.productos = [];
  }
  agregarProducto(producto) {
    this.productos.push(producto);
  }
  static deJsonAObjetoComercio(dataComercio) {
    let nuevoComercio = new Comercio(
      dataComercio.idComercio,
      dataComercio.nombre,
      dataComercio.cuit,
      dataComercio.direccion,
      dataComercio.fk_idUsuario
    );
    nuevoComercio.productos = dataComercio.productos || [];
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
function tomarComercioPorIdUsuarioDueño(idUsuario) {
  console.log(idUsuario);
  try {
    let comerciosRegistrados = obtenerObjetosBD(
      "../Backend/src/db/comercios.txt"
    );
    console.log(comerciosRegistrados);
    //recorremos los objetos "comercio" y se retorna el que tiene fk_idUsuario que pasamos
    for (comercio of comerciosRegistrados) {
      console.log(comercio);
      if (comercio.fk_idUsuario === idUsuario) {
        return comercio;
      }
    }
  } catch (error) {
    console.log(
      error +
        "/nel comercio cuyo dueño tiene el id " +
        idUsuario +
        " no se encontró"
    );
  }
}

//obtiene los comercios almacenados en la bd y los devuelve
function tomarComercios() {
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

    const comerciosActualizados = comerciosRegistrados.filter(
      (comercio) => comercio.idComercio !== idComercio
    );

    escribirObjetosBD(comerciosActualizados);
    return comerciosActualizados;
  } catch (error) {
    return new Error({ message: "error al eliminar desde el model" });
  }
}
function agregarProductoAComercio(idComercio, producto) {
  console.log("entrase a agregar prod");
  let comerciosRegistrados = obtenerObjetosBD(
    "../Backend/src/db/comercios.txt"
  );

  //encontramos el indice del comercio que le vampos a agregar el producto
  const comercioIndex = comerciosRegistrados.findIndex(
    (c) => c.idComercio === idComercio
  );

  if (comercioIndex === -1) {
    throw new Error("Comercio no encontrado");
  }

  let comercio = Comercio.deJsonAObjetoComercio(
    comerciosRegistrados[comercioIndex]
  );

  console.log(comercio);
  comercio.agregarProducto(producto);
  console.log(comercio);

  //actualizamos los valores del comercio indicado por el nuevo obj con el produccto pusheado
  comerciosRegistrados[comercioIndex] = comercio;

  escribirObjetosBD("../Backend/src/db/comercios.txt", comerciosRegistrados);

  return comercio;
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
module.exports = {
  guardarComercio,
  tomarComercioPorId,
  tomarComercioPorIdUsuarioDueño,
  tomarComercios,
  eliminarComercio,
  agregarProductoAComercio,
};
