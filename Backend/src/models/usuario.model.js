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
}

function guardarUsuario(dataBody) {
  const usuarioNuevo = new Usuario(...dataBody);

  let usuariosRegistrados = obtenerObjetosBD("../backend/src/db/usuarios.txt");

  usuariosRegistrados.push(usuarioNuevo);
  escribirObjetosBD("../backend/src/db/usuarios.txt", usuariosRegistrados);

  return usuarioNuevo;
}
function getUserById(idUsuario) {
  
  console.log(idUsuario);
  try {
    let usuariosRegistrados = obtenerObjetosBD("../backend/src/db/usuarios.txt");
    // Asegúrate de que el campo en los objetos sea 'id_usuario', no 'idUsuario'
    return usuariosRegistrados.find(usuario => usuario.id_usuario === idUsuario);
  } catch (error) {
    // console.log(error);
    return null;
}

  //find
  // try {
  //   let usuariosRegistrados = obtenerObjetosBD();
  //   return usuariosRegistrados.find(usuario => usuario.id_usuario === idUsuario);
  // } catch (error) {
  //   console.log(error);
  //   return null;
  // }
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

    const usuariosActualizados = usuariosRegistrados.filter(
      (usuario) => usuario.id_usuario !== idUsuario
    );

    // if (usuariosRegistrados.length === usuariosActualizados.length) {
    //   throw new Error("Usuario no encontrado");
    // }

    escribirObjetosBD("../backend/src/db/usuarios.txt", usuariosActualizados);

    return usuariosActualizados;
  } catch (error) {
    return new Error({ message: "error al eliminar" });
  }
}
function actualizarUsuario(idUsuario, datosActualizados) {
  try {
    let usuariosRegistrados = obtenerObjetosBD(
      "../backend/src/db/usuarios.txt"
    );
    //encontrar el indice donde se ubica el usuario a actualizar
    const indiceUsuario = usuariosRegistrados.findIndex(
      (usuario) => usuario.id_usuario === idUsuario
    );
    //cuando no encuentre coincidencia el findIndex retorna el valor -1
    if (indiceUsuario === -1) {
      throw new Error("Usuario no encontrado");
    }

    // Actualizamos solo los campos proporcionados
    //   "..." este operador, permite "desempaquetar" los elementos de un objeto o array.
    const usuarioActualizado = {
      ...usuariosRegistrados[indiceUsuario], //"desempaqueta" todas las propiedades y sus valores
      ...datosActualizados, // cualquier propiedad que exista en ambos objetos será sobrescrita por el valor en datosActualizados, las demas se mantienen y no se modifian
    };

    // Aseguramos que el ID sea el que viene en parametros
    usuarioActualizado.id_usuario = idUsuario;

    // Reemplazamos el usuario en el array
    usuariosRegistrados[indiceUsuario] = usuarioActualizado;

    // Escribimos los cambios en el archivo
    escribirObjetosBD("../backend/src/db/usuarios.txt", usuariosRegistrados);

    return usuarioActualizado;
  } catch (error) {
    console.error("Error al actualizar usuario:", error.message);
    throw error;
  }
}

//Metodos para consultar bd. path-> ruta del archivo .json--------------------------------------------------------
function obtenerObjetosBD(path) {
  let stringDeObjetos = fs.readFileSync(path, "utf-8");
  if (!stringDeObjetos.trim()) {
    console.log("El archivo está vacío.");
    return []; // Retorna un array vacío cuando aun no se cargan productos
  }
  let objetosEnBD = JSON.parse(stringDeObjetos);

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
  actualizarUsuario,
};
