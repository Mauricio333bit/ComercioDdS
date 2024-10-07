const express = require("express");
const multer = require("multer");

const upload = multer({ dest: "uploads/" }); //destino de los archivos subidos

const app = express();

const userController = require("./src/controllers/usuario.controller");
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
app.post("/login", userController.loguearUsuario);

app.post("/usuario/:id", userController.getUserById);
app.get("/usuario/all", userController.getAllUsers);
app.delete("/usuario/:id", userController.eliminarUsuario);
app.post("//usuario/editar/:id", userController.editarUsuario);

//rutas comercio
//como parametro en la url debemos enviar el id del usuario dueño del comercio a crear-- htt.../registrar/12343133
app.post("/comercio/registrar/:id", comercioController.registrarComercio);
app.get("/comercio/:id", comercioController.getComercioById);

// app.get("/comercio/all", comercio.controller.tomarTodosLosComercios);
// app.delete("/comercio/:id", comercio.controller.eliminarCoemrcio);

//rutas productos
// app.post(
//   "/producto/registrar/:id",
//   upload.array("imgProducto", 3),
//   productoController.registerProducto
// );
