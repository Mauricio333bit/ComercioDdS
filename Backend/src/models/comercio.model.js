const { v4: uuidv4 } = require("uuid");
class Comercio {
  constructor(nombre, email, telefono, contraseña, rol) {
    this.idComercio = uuidv4();
    this.nombre = nombre;
    this.email = email;
    this.contraseña = contraseña;
    this.telefono = telefono;
    this.rol = rol;
  }

  static fromJSONtoObjectComercio(dataComercio) {
    let nuevoComercio = new Comercio(
      dataComercio.nombre,
      dataComercio.email,
      dataComercio["contraseña"],
      dataComercio.telefono,
      dataComercio.rol
    );

    return nuevoComercio;
  }
}
function guardarComercio(dataBody) {
  const comercioNuevo = Comercio.fromJSONtoObjectComercio(dataBody);

  let comerciosRegistrados = obtenerObjetosBD("../db/comercios.txt");

  comerciosRegistrados.push(comercioNuevoNuevo);
  escribirObjetosBD("../db/comercios.txt", comercioNuevo);

  return comercioNuevo;
}

//Metodos para consultar bd. path-> ruta del archivo .txt--------------------------------------------------------
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
  guardarComercio,
};
