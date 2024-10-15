const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

class Producto {
  constructor(
    nombre,
    precio,
    detalles,
    categoria,
    disponibilidad,
    imagenes,
    oferta,
    descuento,
    fk_id_comercio
  ) {
    this.id_producto = uuidv4();
    this.nombre_producto = nombre;
    this.precio = precio;
    this.detalles = detalles;
    this.categoria = categoria;
    this.disponibilidad = disponibilidad;
    this.imagenes = imagenes;
    this.oferta = oferta;
    this.descuento = descuento;
    this.fk_id_comercio = fk_id_comercio;
  }

  static fromJSONtoObjectProducto(data) {
    let productoNuevo = new Producto(
      data.nombre,
      data.precio,
      data.detalles,
      data.categoria,
      data.disponibilidad,
      data.imgProducto,
      data.oferta,
      data.descuento,
      data.idComercio
    );

    return productoNuevo;
  }
}

function guardarProducto(data) {
  console.log("Aaaaaa");
  console.log(data);
  const productoNuevo = Producto.fromJSONtoObjectProducto(data);
  console.log(productoNuevo);

  let productosRegistrados =
    obtenerObjetosBD("../backend/src/db/productos.txt") || [];
  console.log(productosRegistrados);

  productosRegistrados.push(productoNuevo);

  escribirObjetosBD("../backend/src/db/productos.txt", productosRegistrados);

  return productoNuevo;
}
function tomarProductoPorId(idProducto) {
  try {
    let productosRegistrados = obtenerObjetosBD(
      "../Backend/src/db/productos.txt"
    );

    //se retorna el que tiene id que pasamos
    for (producto of productosRegistrados) {
      if (producto.id_producto === idProducto) {
        return producto;
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
function tomarProductos() {
  try {
    let productosRegistrados = obtenerObjetosBD(
      "../backend/src/db/productos.txt"
    );

    return productosRegistrados;
  } catch (error) {
    console.error("Error al leer o parsear el archivo de comercios:", error);
    return [];
  }
}
function tomarProductosDeUnComercio(idComercio) {
  try {
    let productosRegistrados = obtenerObjetosBD(
      "../Backend/src/db/productos.txt"
    );

    //se retorna un nuevo array de los productos con el fk que pasamos
    const productos = productosRegistrados.filter(
      (producto) => producto.fk_id_comercio !== idComercio
    );
    return productos;
  } catch (error) {
    console.log(
      error +
        "/nel comercio cuyo dueño tiene el id " +
        idUsuario +
        " no se encontró"
    );
    return error;
  }
}

//Metodos para consultar bd. path-> ruta del archivo .json--------------------------------------------------------
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
  guardarProducto,
  tomarProductoPorId,
  tomarProductos,
  tomarProductosDeUnComercio,
};
