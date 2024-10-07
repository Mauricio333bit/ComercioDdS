const Comercio = require("../models/comercio.model");

//recibe los datos del cuepro de la solicitud y ejecuta el metodo para almacenarlo
const registrarComercio = (req, res) => {
  try {
    const idUsuario = req.params.id;

    const comercioNuevo = Comercio.guardarComercio(idUsuario, req.body);
    console.log(comercioNuevo);
    return res
      .status(201)
      .send({ message: "Creaste un nuevo comercio: " + comercioNuevo });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const getComercioById = (req, res) => {
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

module.exports = { registrarComercio, getComercioById };
