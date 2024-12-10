const Producto = require("../models/producto.model");
const Comercio = require("../models/comercio.model");

// Función para registrar un producto
const registerProduct = (req, res) => {
  try {
    console.log(req.files); // Verificación de archivos subidos
    console.log(req.body); // Verificación de datos del cuerpo

    const {
      nombre,
      precio,
      detalles,
      categoria,
      disponibilidad,
      oferta,
      descuento,
    } = req.body;

    // Obtener el id del comercio desde los parámetros de la URL
    const idComercio = req.params.id;

    // Obtener las rutas de las imágenes subidas con la URL relativa
    const port = process.env.PORT || 3333; // Puerto dinámico
    const imgProducto = req.files
      ? req.files.map(
          (file) => `http://localhost:${port}/uploads/${file.filename}`
        ) // Construir URL relativa
      : []; // Si no hay archivos, usar array vacío

    // Registrar el nuevo producto
    const productoNuevo = Producto.guardarProducto({
      nombre,
      precio,
      detalles,
      categoria,
      disponibilidad,
      imgProducto, // Pasar las URLs de las imágenes
      oferta,
      descuento,
      idComercio,
    });

    return res.status(201).send({
      message: "Producto registrado exitosamente",
      producto: productoNuevo,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// Función para obtener un producto por ID
const getProductById = (req, res) => {
  try {
    const id = req.params.id;
    const producto = Producto.tomarProductoPorId(id);
    if (!producto) {
      return res.status(404).send({
        message: "El id ingresado no corresponde a ningún producto",
      });
    }
    res.status(200).send(producto);
  } catch (error) {
    res.status(500).send({
      message: "Error al obtener el producto con el id: " + id,
      error: error.message,
    });
  }
};

// Función para obtener todos los productos
const getAllProducts = (req, res) => {
  try {
    const productosRegistrados = Producto.tomarProductos();
    return res.status(200).send({
      message: "Productos registrados: ",
      productosRegistrados,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// Función para obtener productos de un comercio específico
const getProductsByStoreId = (req, res) => {
  try {
    const idComercio = req.params.id; // Obtener ID del comercio

    if (!idComercio) {
      return res.status(400).send({
        message: "El ID del comercio es obligatorio.",
      });
    }

    const productos = Producto.tomarProductosDeUnComercio(idComercio);

    if (productos.length === 0) {
      return res.status(404).send({
        message: `No se encontraron productos para el comercio con ID: ${idComercio}`,
      });
    }

    return res.status(200).send({
      message: "Productos encontrados",
      productos,
    });
  } catch (error) {
    console.error("Error al obtener productos por comercio:", error);
    return res.status(500).send({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

module.exports = {
  getProductsByStoreId,
  // Otras funciones aquí...
};

// Función para eliminar un producto
const deleteProducto = (req, res) => {
  try {
    const id = req.params.id;

    const productosActualizados = Producto.eliminarProducto(id);

    if (!productosActualizados) {
      return res.status(404).send({
        message: "Producto no encontrado o ya eliminado",
      });
    }

    res.status(200).send({
      message: "Producto y sus imágenes eliminados correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).send({
      message: "No se pudo eliminar el producto",
      error: error.message,
    });
  }
};

// Función para editar un producto
const editarProducto = (req, res) => {
  try {
    const id = req.params.id;

    console.log("Archivos subidos:", req.files); // Verificación de archivos subidos

    // Nuevos datos del cuerpo
    const {
      nombre,
      precio,
      detalles,
      categoria,
      disponibilidad,
      oferta,
      descuento,
    } = req.body;

    // Verificar si hay imágenes y construir la URL con el puerto dinámico
    const port = process.env.PORT || 3333;
    const nuevasImagenes =
      req.files && req.files.length > 0
        ? req.files.map(
            (file) => `http://localhost:${port}/uploads/${file.filename}`
          )
        : [];

    // Crear objeto con los nuevos datos, solo si existen valores
    const nuevosDatos = {
      nombre: nombre || undefined,
      precio: precio || undefined,
      detalles: detalles || undefined,
      categoria: categoria || undefined,
      disponibilidad: disponibilidad || undefined,
      oferta: oferta || undefined,
      descuento: descuento || undefined,
      imagenes: nuevasImagenes.length > 0 ? nuevasImagenes : undefined,
    };

    // Verificar si el producto existe antes de editar
    const productoExistente = Producto.tomarProductoPorId(id); // Buscar producto por ID
    if (!productoExistente) {
      return res.status(404).send({
        message: `Producto con id: ${id} no encontrado`,
      });
    }

    // Llamar al modelo para editar el producto, pasando el ID y los nuevos datos
    const productoActualizado = Producto.editarProducto(id, nuevosDatos);

    return res.status(200).send({
      message: "Producto editado exitosamente",
      producto: productoActualizado,
    });
  } catch (error) {
    console.error("Error al editar el producto:", error);
    return res.status(500).send({
      message: "No se pudo editar el producto",
      error: error.message,
    });
  }
};

module.exports = {
  registerProduct,
  getProductById,
  getAllProducts,
  getProductsByStoreId,
  deleteProducto,
  editarProducto,
};
