const { v4: uuidv4 } = require("uuid");
class Categoria {
  constructor(nombre) {
    this.idCategoria = uuidv4();
    this.nombre = nombre;
  }

  static fromJSONtoObjectCategoria(dataCategoria) {
    let nuevoCategoria = new Categoria(
      dataCategoria.idCategoria,
      dataCategoria.nombre
    );

    return nuevoCategoria;
  }
}
function guardarCategoria(dataBody) {
  const CategoriaNuevo = Categoria.fromJSONtoObjectCategoria(dataBody);

  let CategoriasRegistrados = obtenerObjetosBD("../db/categorias.txt");

  CategoriasRegistrados.push(CategoriaNuevoNuevo);
  escribirObjetosBD("../db/categorias.txt", CategoriaNuevo);

  return CategoriaNuevo;
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
  guardarCategoria,
};
