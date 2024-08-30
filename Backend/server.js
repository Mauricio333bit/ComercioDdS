const express = require("express");

const app = express();

const userController = require("./src/controllers/user.controller");
const comercioController = require("./src/controllers/comercio.controller");
const productoController = require("./src/controllers/producto.controller");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 3333;
app.listen(port, () => {
  console.log("Escuchando en el puerto: " + port);
});

//------------- zona de ruteo ------------------

//rutas usuario
app.post("/usuario/registrar", userController.registerUser);
app.post("/usuario/:id", userController.getUserById);
app.get("/usuario/all", userController.getAllUsers);
app.post("/login", userController.loguearUsuario);
app.delete("/usuario/:id", userController.eliminarUsuario);

//rutas comercio

app.post("/comercio/registrar/:id", comercioController.registerComercio);

// app.post("/comercio/:id", comercio.controller.tomarComercioPorId);
// app.get("/comercio/all", comercio.controller.tomarTodosLosComercios);
// app.delete("/comercio/:id", comercio.controller.eliminarCoemrcio);

//rutas productos
app.post("/producto/registrar/:id", productoController.registerProducto);
