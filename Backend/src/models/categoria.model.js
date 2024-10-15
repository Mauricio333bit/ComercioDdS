const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

class Categoria {
  constructor(nombre, idCategoria = uuidv4()) {
    this.idCategoria = idCategoria;
    this.nombre = nombre;
  }

  static fromJSONtoObjectCategoria(dataCategoria) {
    return new Categoria(dataCategoria.nombre, dataCategoria.idCategoria);
  }
}

function guardarCategoria(dataBody) {
  const CategoriaNew = Categoria.fromJSONtoObjectCategoria(dataBody);
  let categoriasRegistradas = obtenerObjetosBD("../backend/src/db/categorias.txt");

  categoriasRegistradas.push(CategoriaNew);
  escribirObjetosBD("../backend/src/db/categorias.txt", categoriasRegistradas);

  return CategoriaNew;
}

function obtenerObjetosBD(path) {
  let stringDeObjetos = fs.readFileSync(path, "utf-8");
  if (!stringDeObjetos.trim()) {
    return [];
  }
  return JSON.parse(stringDeObjetos);
}

function escribirObjetosBD(path, objetos) {
  fs.writeFileSync(path, JSON.stringify(objetos, null, 2));
}











function eliminarCategoria(idCategoria) {
  try {
    let categoriasRegistradas = obtenerObjetosBD(
      "../backend/src/db/categorias.txt"
    );

    const categoriasActualizadas = categoriasRegistradas.filter(
      (categoria) => categoria.idCategoria !== idCategoria // Asegúrate de que esto coincida con la propiedad de tu objeto
    );

    escribirObjetosBD("../backend/src/db/categorias.txt", categoriasActualizadas); // Asegúrate de pasar la ruta correcta
    return categoriasActualizadas; // Devolver las categorías actualizadas para uso posterior
  } catch (error) {
    console.error(error); // Agregar un log del error
    return null; // En caso de error, retornar null para manejarlo en el controlador
  }
}



module.exports = {
  guardarCategoria, // Exportamos guardarCategoria
  eliminarCategoria,
};
