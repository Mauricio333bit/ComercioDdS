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

module.exports = { registrarComercio };
