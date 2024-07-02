const Comercio = require("../models/comercio.model");

const registerComercio = (req, res) => {
  try {
    // const comercioNuevo = Comercio.guardarComercio(req.body);

    return res
      .status(201)
      .send({ message: "entraste a crear un nuevo comercio" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { registerComercio };
