const Producto = require("../models/producto.model");
//al de comercio lo usamos para agregar,revisar este caso de uso***
const Comercio = require("../models/comercio.model");
//con los datos que vinen en el cuerpo(body) de la solicitud
const registerProduct = (req, res) => {
  try {
    console.log(req.file);
    console.log(req.body);
    // Desestructurar el cuerpo de la solicitud para obtener los datos del producto
    const {
      nombre,
      precio,
      detalles,
      categoria,
      disponibilidad,
      oferta,
      descuento,
    } = req.body;

    // El id del comercio lo obtenemos de los parámetros de la url
    const idComercio = req.params.id;

    // Obtener las rutas de las imágenes subidas
    const imgProducto = req.files.map((file) => file.path); // Por cada file toma la ruta y la almacena en un arrray, ese array lo almacenamos en imgProducto.

    // Registrar el nuevo producto
    const productoNuevo = Producto.guardarProducto({
      nombre,
      precio,
      detalles,
      categoria,
      disponibilidad,
      imgProducto, // Pasar las rutas de las imágenes
      oferta,
      descuento,
      idComercio,
    });
    //agregamos el producto nuevo al array en este metodo,pero me parece que no es necesario. Porque podemos consultar a la db los productos cuyo id de comercio sea tal y asi obtenemos todos los productos
    //Comercio.agregarProductoAComercio(idComercio, productoNuevo);

    return res.status(201).send({
      message: "Producto registrado exitosamente",
      producto: productoNuevo,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getProductById = (req, res) => {
  try {
    const id = req.params.id;

    const producto = Producto.tomarProductoPorId(id);
    if (!producto) {
      res
        .status(404)
        .send({ message: "El id ingresado no corresponde a ningun producto" });
    }
    res.status(200).send(producto);
  } catch (error) {
    res.status(500).send({
      message: "Prod no encontrado cuyo id: " + id + ". error en controller.",
    });
  }
};
const getAllProducts = (req, res) => {
  try {
    const productosRegistrados = Producto.tomarProductos();

    return res
      .status(201)
      .send({ message: "Productos registrados: ", productosRegistrados });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getProductsByStoreId = (req, res) => {
  try {
    // Asegúrate de usar 'id' correctamente
    const idComercio = req.params.id; // Obtiene el ID del comercio de los parámetros de la solicitud

    const productos = Producto.tomarProductosDeUnComercio(idComercio);
    if (productos.length === 0) {
      return res.status(404).send({
        message:
          "No se encontraron productos para el comercio con ID: " + idComercio,
      });
    }

    return res.status(200).send({
      message: "Productos encontrados",
      productos,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error al obtener productos del comercio con ID: " + idComercio,
      error: error.message,
    });
  }
};

const deleteProducto = (req, res) => {
  try {
    const id = req.params.id;

    let productosActualizados = Producto.eliminarProducto(id);

    if (!productosActualizados || productosActualizados.length === 0) {
      return res
        .status(404)
        .send({ message: "Producto no encontrado o ya eliminado" });
    }

    res
      .status(200)
      .send({ message: "Producto y sus imágenes eliminados correctamente" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "No se pudo eliminar", error: error.message });
  }
};

const editarProducto = (req, res) => {
  try {
    const id = req.params.id;

    // Verificar si req.files contiene archivos de imagen
    console.log("Archivos subidos:", req.files); // Para verificar en consola

    // Procesar los nuevos datos del cuerpo
    const {
      nombre,
      precio,
      detalles,
      categoria,
      disponibilidad,
      oferta,
      descuento,
    } = req.body;

    // Procesar las nuevas imágenes, si existen
    const nuevasImagenes =
      req.files && req.files.length > 0
        ? req.files.map((file) => file.path)
        : [];

    // Crear objeto con los nuevos datos
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

    // Llamar al modelo para editar el producto
    const productoActualizado = Producto.editarProducto(id, nuevosDatos);

    return res.status(200).send({
      message: "Producto editado exitosamente",
      producto: productoActualizado,
    });
  } catch (error) {
    console.error("Error al editar el producto:", error);
    return res
      .status(500)
      .send({ message: "No se pudo editar el producto", error: error.message });
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
