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
    Comercio.agregarProductoAComercio(idComercio, productoNuevo);

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

const getPoductsByStoreId = (req, res) => {
  try {
    const id = req.params.id;

    const productos = Producto.tomarProductosDeUnComercio(id);
    if (!productos) {
      res.status(404).send({
        message: "El id ingresado no corresponde a ningun comercio",
      });
    }
    res.status(200).send(comercio);
  } catch (error) {
    res.status(500).send({
      message:
        "Productos no encontrados cuyo id de comercio es: " +
        id +
        ".Error en cntroller",
    });
  }
};

const eliminarProducto = async (req, res) => {
  try {
    const id = req.params.id;
    let usuariosActualizados = await User.eliminarUsuario(id);
    console.log(usuariosActualizados);
    res.status(200).send({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(400).send({ message: "no se pudo eliminar" });
  }
};
const editarProducto = (req, res) => {
  try {
    const id = req.params.id;
  } catch (error) {}
};
module.exports = {
  registerProduct,
  getProductById,
  getAllProducts,
  getPoductsByStoreId,
};
