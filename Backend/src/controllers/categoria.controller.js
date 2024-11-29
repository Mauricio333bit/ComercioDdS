const { guardarCategoria, eliminarCategoria, actualizarCategoria, getCategorias, getCatById } = require('../models/categoria.model.js');

const registerCategoria = (req, res) => {
  try {
    const data = req.body; // Obtiene los datos del body
    const categoriaNueva = guardarCategoria(data); // Llama a la función guardarCategoria
    console.log(categoriaNueva);
    return res.status(201).send({ message: "Creaste una nueva categoría", categoria: categoriaNueva });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deleteCategoria = (req, res) => {
  try {
    const id = req.params.id;
    let categoriasActualizadas = eliminarCategoria(id);
    // Verificar si se eliminaron categorías
    if (!categoriasActualizadas) {
      return res.status(404).send({ message: "Categoría no encontrada" });
    }
    console.log(categoriasActualizadas);
    res.status(200).send({ message: "Categoría eliminada correctamente" });
  } catch (error) {
    console.error(error); // Agregar un log del error
    res.status(400).send({ message: "No se pudo eliminar" });
  }
};
// se recibe el id de la categoria a buscar
const obtenerCatById=(req, res)=>{
  try {
    const id = req.params.id;
    console.log('Id recibido: ', id);

    const categoria = getCatById(id);

    res.status(200).send({message: "categoria encontrada", categoria});

  } catch (error) {
    res.status(500).send({ message: "Categoria no encontrada con id: " + id });
  }
}


const editCategoria = (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;
    

    console.log("ID recibido para actualizar:", id);
    console.log("Datos para actualizar:", newData);
    
    // Cambia Categoria.actualizarCategoria por actualizarCategoria directamente
    const categoriaActualizada = actualizarCategoria(id, newData);

    if (!categoriaActualizada) {
      return res.status(404).send({ message: "El id ingresado no corresponde a ninguna categoría" });
    }

    return res.status(200).send({ message: "Categoría actualizada correctamente", categoria: categoriaActualizada });
  } catch (error) {
    return res.status(500).send({ message: "No se pudo actualizar la categoría", error: error.message });
  }
};


const getAllCategorias = (req, res) => {
  try {
    // Llamar directamente a la función importada 'getCategorias' en lugar de 'Categoria.getCategorias'
    const categoriasRegistradas = getCategorias(); 
    console.log("Categorías registradas:", categoriasRegistradas);


    return res
      .status(201)
      .send({ message: "Categorias registradas: ", categoriasRegistradas });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};









module.exports = {
  registerCategoria,
  deleteCategoria,
  editCategoria,
  getAllCategorias,
  obtenerCatById
};
