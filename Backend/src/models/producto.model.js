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
      data.id_producto,
      data.nombre_producto,
      data.precio,
      data.detalles,
      data.categoria,
      data.disponibilidad,
      data.imagenes,
      data.oferta,
      data.descuento,
      data.fk_id_comercio
    );

    return productoNuevo;
  }
}

function guardarProducto(data) {
  const productoNuevo = Producto.fromJSONtoObjectProducto(data);

  let productosRegistrados = obtenerObjetosBD(
    "../backend/src/db/productos.txt"
  );

  productosRegistrados.push(productoNuevo);

  escribirObjetosBD("../backend/src/db/productos.txt", productosRegistrados);

  return productoNuevo;
}

//Metodos para consultar bd. path-> ruta del archivo .json--------------------------------------------------------
function obtenerObjetosBD(path) {
  let stringDeObjetos = fs.readFileSync(path, "utf-8");
  let objetosEnBD = JSON.parse(stringDeObjetos);
  if (!objetosEnBD) {
    return [];
  }
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
};
