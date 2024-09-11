const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
class Usuario {
  constructor(nombre, email, telefono, contrasena, rol) {
    this.id_usuario = uuidv4();
    this.nombre = nombre;
    this.email = email;
    this.contrasena = contrasena;
    this.telefono = telefono;
    this.rol = rol;
  }

  static fromJSONtoObjectUsuario(dataUser) {
    let nuevoUsuario = new Usuario(
      dataUser.nombre,
      dataUser.email,
      dataUser["contrasena"],
      dataUser.telefono,
      dataUser.rol
    );

    return nuevoUsuario;
  }
}

function guardarUsuario(dataBody) {
  const usuarioNuevo = Usuario.fromJSONtoObjectUsuario(dataBody);

  let usuariosRegistrados = obtenerObjetosBD("../backend/src/db/usuarios.txt");

  usuariosRegistrados.push(usuarioNuevo);
  escribirObjetosBD("../backend/src/db/usuarios.txt", usuariosRegistrados);

  return usuarioNuevo;
}
function getUserById(idUsuario) {
  try {
    let usuariosRegistrados = obtenerObjetosBD(
      "../backend/src/db/usuarios.txt"
    );
    //recorremos los objetos "usuario" dentro de la coleccion de ususarios registrados
    for (usuario of usuariosRegistrados) {
      if (usuario.idUsuario === idUsuario) {
        return usuario;
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function getUsuarios() {
  try {
    let usuariosRegistrados = obtenerObjetosBD(
      "../backend/src/db/usuarios.txt"
    );

    return usuariosRegistrados;
  } catch (error) {
    console.error("Error al leer o parsear el archivo de usuarios:", error);
    return [];
  }
}

function eliminarUsuario(idUsuario) {
  try {
    let usuariosRegistrados = obtenerObjetosBD(
      "../backend/src/db/usuarios.txt"
    );

    usuariosRegistrados.filter((usuario) => {
      return usuario.idUsuario === idUsuario ? usuario : [];
    });
    escribirObjetosBD(usuariosRegistrados);
    return usuariosRegistrados;
  } catch (error) {
    return new Error({ message: "error al eliminar" });
  }
}
function actualizarUsuario(idUsuario, usuarioUdata) {}

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
  guardarUsuario,
  getUsuarios,
  getUserById,
  eliminarUsuario,
};
