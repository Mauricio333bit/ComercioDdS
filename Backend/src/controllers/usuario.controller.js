const seguridad = require("../../seguridad.js");

const User = require("../models/usuario.model.js");
//en el body de la solicitud vienen los datos para crear el nuevo usuario
const registerUser = (req, res) => {
  try {
    //ejecutamos el metodo del modelo y le pasamos los datos requeridoss
    const usuarioNuevo = User.guardarUsuario(req.body);

    return res
      .status(201)
      .send({ message: "usuario registrado", usuarioNuevo });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

//recibimos en el los parametros de la req(solicitud) el id del usario que buscamos
const getUserById = (req, res) => {
  try {
    const id = req.params.id;

    const user = User.getUserById(id);
    //si no encontró el usuario entonces no existe user
    if (!user) {
      res
        .status(404)
        .send({ message: "El id ingresado no corresponde a ningun usuario" });
    }
    //
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
const loginUser = (req, res) => {
  try {
    let usuarioAutorizado = seguridad.autenticarUsuario(req.body);
    if (!usuarioAutorizado) {
      res.status(400).send({ message: "Los datos ingresados no son validos" });
    }
    res.status(200).send("Usuario logueado con exito", usuarioAutorizado);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};
const deleteUser = (req, res) => {
  try {
    const id = req.params.id;
    let usuariosActualizados = User.eliminarUsuario(id);
    console.log(usuariosActualizados);
    res.status(200).send({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(400).send({ message: "No se pudo eliminar" });
  }
};
const editUser = (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;
    const user = User.actualizarUsuario(id, newData);
    if (!user) {
      res
        .status(404)
        .send({ message: "El id ingresado no corresponde a ningun usuario" });
    }
    res
      .status(200)
      .send({ message: "Usuario actualizado correctamente", user });
  } catch (error) {
    res.status(500).send({ message: "No se pudo actualizar el usuario" });
  }
};

//este archivo js se exporta como modulo y de ahi podemos acceder a las funciones exportadas desde donde se requieran
module.exports = {
  registerUser,
  getAllUsers,
  loginUser,
  getUserById,
  deleteUser,
  editUser,
};
