const User = require("./src/models/user.model.js");

function autenticarUsuario(reqBody) {
  // console.log("seguridad --> modelo 'getUsuarios()'");
  // console.log("seguridad <-r- modelo '[{Usuario}]'");
  let usuariosRegistrados = User.getUsuarios();

  if (reqBody.contraseña) {
    let usuarioAutorizado = usuariosRegistrados.find(
      // el metodo find de array nos retorna el primer elemento qye cumpla las condiciones
      (usuarioDeLaColeccion) =>
        reqBody.email === usuarioDeLaColeccion.email &&
        reqBody.contraseña === usuarioDeLaColeccion.contraseña
    );

    if (!usuarioAutorizado) {
      return false;
    }
    return true;
  } else {
    throw new Error("no ingresaste contraseña");
  }
}

module.exports = { autenticarUsuario };
