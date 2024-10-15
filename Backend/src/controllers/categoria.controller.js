const { guardarCategoria, eliminarCategoria } = require('../models/categoria.model.js');

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

module.exports = {
  registerCategoria,
  deleteCategoria,
};
