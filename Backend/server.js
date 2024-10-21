const express = require("express");
const path = require("path");
const multer = require("multer");
// Configurar dónde y cómo almacenar los archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folderPath;

    // Basado en la ruta de la solicitud,si la ruta incluye la cadena de string que definimos almacena en determinada carpeta,a futuro si decidimos incluir foto al usuario o al comercio

    if (req.route.path.includes("/producto")) {
      folderPath = path.join(__dirname, "uploads", "productos"); // Carpeta para productos
    }

    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Guardar el archivo con un nombre único
  },
});

const upload = multer({ storage: storage });
// ------------------------------------------------------------------------------

//controladores
const userController = require("./src/controllers/usuario.controller");
const comercioController = require("./src/controllers/comercio.controller");
const productoController = require("./src/controllers/producto.controller");
const categoriaController = require("./src/controllers/categoria.controller");

//app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 3333;
app.listen(port, () => {
  console.log("Escuchando en el puerto: " + port);
});

//------------- zona de ruteo ------------------

//rutas usuario

app.post("/usuario/registrar", userController.registerUser);
app.post("/login", userController.loginUser);

app.post("/usuario/:id", userController.getUserById);
app.get("/usuario", userController.getAllUsers); //
app.delete("/usuario/:id", userController.deleteUser);
app.post("/usuario/editar/:id", userController.editUser);

//rutas categoria
app.post("/categoria/registrar", categoriaController.registerCategoria);
app.delete("/categoria/eliminar/:id", categoriaController.deleteCategoria);
app.post("/categoria/editar/:id", categoriaController.editCategoria);

//rutas comercio

app.post("/comercio/registrar/:id", comercioController.registerStore); //como parametro en la url debemos enviar el id del usuario dueño del comercio a crear-- htt.../registrar/12343133
app.get("/comercio/:id", comercioController.getStoreById);
app.get("/comercio/owner/:id", comercioController.getStoreByOwnerId);
app.get("/comercio", comercioController.getAllStores);
app.delete("/comercio/:id", comercioController.deleteStore);

// rutas productos

// (desde el front vendra un input type file con el atributo name="imgProducto")
app.post("/producto/registrar/:id", upload.array("imgProducto"), productoController.registerProduct);

app.get("/producto/:id", productoController.getProductById);
app.get("/producto", productoController.getAllProducts);
app.delete("/producto/:id", productoController.deleteProducto);
app.put("/producto/editar/:id", productoController.editarProducto);
app.get("/producto/comercio/:id", productoController.getProductsByStoreId);


