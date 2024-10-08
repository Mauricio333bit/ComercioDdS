const Producto = require("../models/producto.model");
//con los datos que vinen en el cuerpo(body) de la solicitud
const registrarProducto = (req, res) => {
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

    // El id del comercio lo obtenemos de los parámetros de la URL
    const idComercio = req.params.id;

    // Obtener las rutas de las imágenes subidas
    const imgProducto = req.files.map((file) => file.path); // Por cada file toma la ruta y la almacena en un arrray, ese array lo almacenamos en imgProducto

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

    return res.status(201).send({
      message: "Producto registrado exitosamente",
      producto: productoNuevo,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getProductoById = (req, res) => {
  try {
    const id = req.params.id;

    const user = User.getUserById(id);
    if (!user) {
      res
        .status(404)
        .send({ message: "El id ingresado no corresponde a ningun usuario" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: "Usuario no encontrado cuyo id: " + id });
  }
};
const getAllProducto = (req, res) => {
  try {
    const usuariosRegistrados = User.getUsuarios();

    return res
      .status(201)
      .send({ message: "Usuarios registrados: ", usuariosRegistrados });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const eliminarProducto = (req, res) => {
  try {
    const id = req.params.id;
    let usuariosActualizados = User.eliminarUsuario(id);
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
module.exports = { registrarProducto };
