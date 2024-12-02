const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

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
    return new Producto(
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
  }
}

// Guardar un nuevo producto
function guardarProducto(data) {
  const productoNuevo = Producto.fromJSONtoObjectProducto(data);
  const filePath = path.join(__dirname, "../db/productos.txt");
  const productosRegistrados = obtenerObjetosBD(filePath) || [];

  productosRegistrados.push(productoNuevo);
  escribirObjetosBD(filePath, productosRegistrados);

  return productoNuevo;
}

// Obtener producto por ID
function tomarProductoPorId(idProducto) {
  const filePath = path.join(__dirname, "../db/productos.txt");
  const productosRegistrados = obtenerObjetosBD(filePath);

  return productosRegistrados.find((producto) => producto.id_producto === idProducto);
}

// Obtener todos los productos
function tomarProductos() {
  const filePath = path.join(__dirname, "../db/productos.txt");
  return obtenerObjetosBD(filePath) || [];
}

// Filtrar productos por ID de comercio
function tomarProductosDeUnComercio(idComercio) {
  const filePath = path.join(__dirname, "../db/productos.txt");
  const productosRegistrados = obtenerObjetosBD(filePath);

  return productosRegistrados.filter(
    (producto) => producto.fk_id_comercio === idComercio
  );
}

// Eliminar un producto
function eliminarProducto(idProducto) {
  const filePath = path.join(__dirname, "../db/productos.txt");
  const productosRegistrados = obtenerObjetosBD(filePath);

  const productoAEliminar = productosRegistrados.find(
    (producto) => producto.id_producto === idProducto
  );

  if (!productoAEliminar) {
    throw new Error("Producto no encontrado");
  }

  if (productoAEliminar.imagenes && productoAEliminar.imagenes.length > 0) {
    productoAEliminar.imagenes.forEach((imagenUrl) => {
      try {
        // Obtener nombre del archivo desde la URL
        const fileName = new URL(imagenUrl).pathname.split("/").pop();
        console.log("Nombre del archivo extraído:", fileName);

        // Construir ruta completa del archivo
        const imagePath = path.join(__dirname, "../../uploads", fileName);
        console.log("Ruta completa del archivo:", imagePath);

        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
          console.log(`Archivo eliminado: ${imagePath}`);
        } else {
          console.warn(`Archivo no encontrado: ${imagePath}`);
        }
      } catch (error) {
        console.error(`Error procesando la imagen ${imagenUrl}:`, error);
      }
    });
  }

  const productosActualizados = productosRegistrados.filter(
    (producto) => producto.id_producto !== idProducto
  );

  escribirObjetosBD(filePath, productosActualizados);

  return productosActualizados;
}







// Editar un producto
function editarProducto(id, nuevosDatos) {
  const filePath = path.join(__dirname, "../db/productos.txt");
  const productosRegistrados = obtenerObjetosBD(filePath);

  const index = productosRegistrados.findIndex((producto) => producto.id_producto === id);
  if (index === -1) throw new Error("Producto no encontrado");

  const productoEditado = {
    ...productosRegistrados[index],
    ...nuevosDatos,
  };

  productosRegistrados[index] = productoEditado;
  escribirObjetosBD(filePath, productosRegistrados);

  return productoEditado;
}

// Funciones auxiliares para manejar archivos
function obtenerObjetosBD(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return data.trim() ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error al leer el archivo:", error);
    throw new Error("No se pudo leer la base de datos");
  }
}

function escribirObjetosBD(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error("Error al escribir en el archivo:", error);
    return false;
  }
}

module.exports = {
  guardarProducto,
  tomarProductoPorId,
  tomarProductos,
  tomarProductosDeUnComercio,
  eliminarProducto,
  editarProducto,
};
