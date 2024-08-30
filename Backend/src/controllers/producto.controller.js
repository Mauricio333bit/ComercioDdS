const Producto = require("../models/producto.model");

const registerProducto = (req, res) => {
  try {
    const {
      nombre,
      precio,
      detalles,
      categoria,
      disponibilidad,
      imagenes,
      oferta,
      descuento,
    } = req.body;
    const id = req.params.id;

    const pro1 = new Producto(id);
    console.log(pro1);
    const productoNuevo = Producto.guardarProducto(
      nombre,
      precio,
      detalles,
      categoria,
      disponibilidad,
      imagenes,
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
const getUserById = (req, res) => {
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
const getAllUsers = (req, res) => {
  try {
    const usuariosRegistrados = User.getUsuarios();

    return res
      .status(201)
      .send({ message: "Usuarios registrados: ", usuariosRegistrados });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const loguearUsuario = (req, res) => {
  try {
    let usuarioAutorizado = seguridad.autenticarUsuario(req.body);
    if (!usuarioAutorizado) {
      res.status(400).send({ message: "Los datos ingresados no son validos" });
    }
    res.status(200).send("Usuario logueado con exito");
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};
const eliminarUsuario = (req, res) => {
  try {
    const id = req.params.id;
    let usuariosActualizados = User.eliminarUsuario(id);
    console.log(usuariosActualizados);
    res.status(200).send({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(400).send({ message: "no se pudo eliminar" });
  }
};
const editarUsusario = (req, res) => {
  try {
    const id = req.params.id;
  } catch (error) {}
};
module.exports = {
  registerProducto,
};
