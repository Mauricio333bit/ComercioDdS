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
  const CategoriaNew = Categoria.fromJSONtoObjectCategoria(dataBody);

  let CategoriasRegistradas = obtenerObjetosBD("../db/categorias.txt");

  CategoriasRegistradas.push(CategoriaNew);
  escribirObjetosBD("../db/categorias.txt", CategoriaNew);

  return CategoriaNew;
}

//Metodos para consultar bd. path-> ruta del archivo .txt--------------------------------------------------------
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
  guardarCategoria,
};
