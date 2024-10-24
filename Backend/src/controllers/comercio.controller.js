//modelo comercio
const Comercio = require("../models/comercio.model");

//recibe los datos del cuepro de la solicitud y ejecuta el metodo para almacenarlo
const registerStore = (req, res) => {
  try {
    const idUsuario = req.params.id;

    const comercioNuevo = Comercio.guardarComercio(idUsuario, req.body);
    console.log(comercioNuevo + " esto retorna el model"); //[objetc Object]????
    return res
      .status(201)
      .send({ message: "Creaste un nuevo comercio: " + comercioNuevo.nombre });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const getStoreById = (req, res) => {
  //creo que usar la palabra get nos va ayudar a identificar el metodo en la ruta
  try {
    const id = req.params.id;

    const comercio = Comercio.tomarComercioPorId(id);
    if (!comercio) {
      res
        .status(404)
        .send({ message: "El id ingresado no corresponde a ningun comercio" });
    }
    res.status(200).send(comercio);
  } catch (error) {
    res.status(500).send({ message: "Usuario no encontrado cuyo id: " + id });
  }
};
const getStoreByOwnerId = (req, res) => {
  //creo que usar la palabra get nos va ayudar a identificar el metodo en la ruta
  try {
    const id = req.params.id;

    const comercio = Comercio.tomarComercioPorIdUsuarioDueño(id);
    if (!comercio) {
      res.status(404).send({
        message: "El id ingresado no corresponde a ningun dueño de comercio",
      });
    }
    res.status(200).send(comercio);
  } catch (error) {
    res.status(500).send({ message: "Usuario no encontrado cuyo id: " + id });
  }
};
const getAllStores = (req, res) => {
  try {
    const comerciosRegistrados = Comercio.tomarComercios();

    return res.status(200).send({
      message: "Todos los comercios registrados: ",
      comerciosRegistrados,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const getProducts = (req, res) => {
  try {
    const comerciosRegistrados = Comercio.tomarComercios();

    return res.status(200).send({
      message: "Todos los comercios registrados: ",
      comerciosRegistrados,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const deleteStore = (req, res) => {
  try {
    const id = req.params.id;
    let comerciosActualizados = Comercio.eliminarComercio(id);
    console.log(comerciosActualizados);
    res.status(200).send({ message: "Comercio eliminado correctamente" });
  } catch (error) {
    res.status(400).send({ message: "No se pudo eliminar" });
  }
};

module.exports = {
  registerStore,
  getStoreById,
  getStoreByOwnerId,
  getAllStores,
  deleteStore,
};
