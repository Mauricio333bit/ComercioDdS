const express = require("express");
const path = require("path");
const multer = require("multer");
// Configurar dónde y cómo almacenar los archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folderPath;

    // Basado en la ruta de la solicitud o algún campo del body
    if (req.route.path.includes("/producto")) {
      folderPath = "./uploads/productos"; // Carpeta para productos
    } else if (req.route.path.includes("/usuario")) {
      folderPath = "./uploads/usuarios"; // Carpeta para usuarios
    } else if (req.route.path.includes("/comercio")) {
      folderPath = "./uploads/comercios"; // Carpeta para comercios
    }
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Guardar el archivo con un nombre único
  },
});

const upload = multer({ storage: storage });

const app = express();

const userController = require("./src/controllers/usuario.controller");
const comercioController = require("./src/controllers/comercio.controller");
const productoController = require("./src/controllers/producto.controller");
const { error } = require("console");

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
app.post("/usuario/editar/:id", userController.editarUsuario);

//rutas comercio
//como parametro en la url debemos enviar el id del usuario dueño del comercio a crear-- htt.../registrar/12343133
app.post("/comercio/registrar/:id", comercioController.registrarComercio);
app.get("/comercio/:id", comercioController.getComercioById);

// app.get("/comercio/all", comercio.controller.tomarTodosLosComercios);
// app.delete("/comercio/:id", comercio.controller.eliminarCoemrcio);

// rutas productos
app.post(
  "/producto/registrar/:id",
  upload.array("imgProducto", 3),
  productoController.registrarProducto
);
