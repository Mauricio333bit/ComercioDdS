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

function getCatById(idCategoria){
  console.log("id = ", idCategoria);
  try{
    let categoriasRegistradas = obtenerObjetosBD("../Backend/src/db/categorias.txt");
    return categoriasRegistradas.find(categoria => categoria.idCategoria == idCategoria);
  }catch(error){
    console.log(error);
    return null;
  }
}






function actualizarCategoria(idCategoria, datosActualizados) {
  try {
    let categoriasRegistradas = obtenerObjetosBD(
      "../Backend/src/db/categorias.txt"
    );

   


    //encontrar el indice donde se ubica el usuario a actualizar
    const indiceCategoria = categoriasRegistradas.findIndex(
      (categoria) => categoria.idCategoria === idCategoria
    );

    //cuando no encuentre coincidencia el findIndex retorna el valor -1
    if (indiceCategoria === -1) {
      throw new Error("Categoria no encontrada");
    }

    // Actualizamos solo los campos proporcionados
    //   "..." este operador, permite "desempaquetar" los elementos de un objeto o array.

    const categoriaActualizada = {
      ...categoriasRegistradas[indiceCategoria], //"desempaqueta" todas las propiedades y sus valores
      ...datosActualizados, // cualquier propiedad que exista en ambos objetos será sobrescrita por el valor en datosActualizados, las demas se mantienen y no se modifian
    };

    // Aseguramos que el ID sea el que viene en parametros
    categoriaActualizada.id_categoria = idCategoria;

    // Reemplazamos el usuario en el array
    categoriasRegistradas[indiceCategoria] = categoriaActualizada;

    // Escribimos los cambios en el archivo
    escribirObjetosBD("../backend/src/db/categorias.txt", categoriasRegistradas);

    return categoriaActualizada;
  } catch (error) {
    console.error("Error al actualizar categoria:", error.message);
    throw error;
  }
}

function getCategorias() {
  try {
    let categoriasRegistradas = obtenerObjetosBD("../Backend/src/db/categorias.txt");
    console.log("Categorías registradas:", categoriasRegistradas);

    // Filtrar solo las categorías que tienen un nombre
    categoriasRegistradas = categoriasRegistradas.filter((categoria) => categoria.nombre);
    console.log("Categorías después de filtrar:", categoriasRegistradas);

    return categoriasRegistradas;
  } catch (error) {
    console.error("Error al leer o parsear el archivo de categorias:", error);
    return [];
  }
}




module.exports = {
  guardarCategoria, // Exportamos guardarCategoria
  eliminarCategoria,
  actualizarCategoria,
  getCategorias,
  getCatById,
};
