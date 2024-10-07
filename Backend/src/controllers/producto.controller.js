const Producto = require("../models/producto.model");

const registrarProducto = (req, res) => {
  try {
    const {
      nombre,
      precio,
      detalles,
      categoria,
      disponibilidad,

      oferta,
      descuento,
    } = req.body;
    const id = req.params.id;
    const imgProducto = req.files;

    const pro1 = new Producto(id);
    console.log(pro1);
    const productoNuevo = Producto.guardarProducto(
      nombre,
      precio,
      detalles,
      categoria,
      disponibilidad,
      imgProducto,
      oferta,
      descuento,
      id
    );

    return res
      .status(201)
      .send({ message: "producto registrado", productoNuevo });
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
module.exports = {};
