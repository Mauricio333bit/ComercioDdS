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
  ) {8
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



const path = require('path');

function eliminarProducto(idProducto) {
  try {
    const filePath = path.join(__dirname, "../db/productos.txt");
    console.log("Ruta generada para productos.txt:", filePath); // Depuración

    let productosRegistrados = obtenerObjetosBD(filePath);

    // Asegúrate de que productosRegistrados sea un array
    if (!Array.isArray(productosRegistrados)) {
      throw new Error("Error al leer los productos");
    }

    const productosActualizados = productosRegistrados.filter(
      (producto) => producto.id_producto !== idProducto
    );

    // Escribir el archivo actualizado
    escribirObjetosBD(filePath, productosActualizados);

    return productosActualizados;
  } catch (error) {
    throw new Error("Error al eliminar desde el model: " + error.message);
  }
}


function editarProducto(idProducto, nuevosDatos) {
  try {
    const filePath = path.join(__dirname, "../db/productos.txt");
    console.log("Ruta generada para productos.txt:", filePath);

    let productosRegistrados = obtenerObjetosBD(filePath);

    const productoIndex = productosRegistrados.findIndex(
      (producto) => producto.id_producto === idProducto
    );

    if (productoIndex === -1) {
      throw new Error("Producto no encontrado");
    }

    const productoActualizado = { ...productosRegistrados[productoIndex], ...nuevosDatos };
    productosRegistrados[productoIndex] = productoActualizado;

    escribirObjetosBD(filePath, productosRegistrados);

    return productoActualizado;
  } catch (error) {
    throw new Error("Error al editar el producto: " + error.message);
  }
};

function tomarProductosDeUnComercio(idComercio) {
  try {
    let productosRegistrados = obtenerObjetosBD("../backend/src/db/productos.txt");

    // Se retorna un nuevo array de los productos que tienen el fk_id_comercio que pasamos
    const productos = productosRegistrados.filter(
      (producto) => producto.fk_id_comercio === idComercio // Cambia !== a === para filtrar correctamente
    );

    return productos;
  } catch (error) {
    console.log(error + "/ El comercio cuyo dueño tiene el id " + idComercio + " no se encontró");
    return [];
  }
};




//Metodos para consultar bd. path-> ruta del archivo .json--------------------------------------------------------
function obtenerObjetosBD(path) {
  try {
    let stringDeObjetos = fs.readFileSync(path, "utf-8");
    if (!stringDeObjetos.trim()) {
      console.log("El archivo está vacío.");
      return []; // Retorna un array vacío cuando aun no se cargan productos
    }
    let objetosEnBD = JSON.parse(stringDeObjetos);
    return objetosEnBD;
  } catch (error) {
    console.error("Error al leer el archivo:", error); // Imprimir el error específico
    throw new Error("No se pudo leer la base de datos");
  }
}



function escribirObjetosBD(filePath, objeto) {
  const fs = require("fs");

  if (!filePath || !objeto) {
    return false;
  }
  fs.writeFileSync(filePath, JSON.stringify(objeto, null, 2)); // Formato JSON legible
  return true;
}


module.exports = {
  guardarProducto,
  tomarProductoPorId,
  tomarProductos,
  tomarProductosDeUnComercio,
  eliminarProducto,
  editarProducto,
  tomarProductosDeUnComercio,
};
