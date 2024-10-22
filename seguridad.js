const User = require("./src/models/usuario.model.js");

function autenticarUsuario(reqBody) {
  // console.log("seguridad --> modelo 'getUsuarios()'");
  // console.log("seguridad <-r- modelo '[{Usuario}]'");
  let usuariosRegistrados = User.getUsuarios();

  if (reqBody.contrasena) {
    let usuarioAutorizado = usuariosRegistrados.find(
      // el metodo find de array nos retorna el primer elemento qye cumpla las condiciones
      (usuarioDeLaColeccion) =>
        reqBody.email === usuarioDeLaColeccion.email &&
        reqBody.contrasena === usuarioDeLaColeccion.contrasena
    );

    if (!usuarioAutorizado) {
      return false;
    }
    return usuarioAutorizado;
  } else {
    throw new Error("no ingresaste contraseña");
  }
}

module.exports = { autenticarUsuario };
