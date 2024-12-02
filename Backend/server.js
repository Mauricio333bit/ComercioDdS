const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = 3333;

// Configuración de CORS
app.use(cors());

// Middleware para manejar datos en formato JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configuración de multer para subida de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folderPath;

    // Verifica que la ruta contiene "/producto"
    if (req.originalUrl.includes("/producto")) {
      folderPath = path.join(__dirname, "uploads"); // Carpeta para productos
    } else {
      return cb(new Error("Ruta no válida para la subida de archivos")); // Manejar error si no se encuentra el destino
    }

    // Asegúrate de que la carpeta existe
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true }); // Crea la carpeta si no existe
    }

    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para el archivo
  },
});
const upload = multer({ storage: storage });

// Verifica que la carpeta 'uploads' exista
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// RUTA: Servir la carpeta 'uploads' como estática
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// RUTA: API para consumir dinámicamente la lista de imágenes
app.get("/api/imagenes", (req, res) => {
  const uploadDir = path.join(__dirname, "uploads");

  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Error al leer la carpeta de imágenes." });
    }

    // Construir la lista de URLs de imágenes
    const imageUrls = files.map((file) => `http://localhost:${port}/uploads/${file}`);
    res.json(imageUrls);
  });
});

// ------------------------------------------------------------------------------
// Controladores
const userController = require("./src/controllers/usuario.controller");
const comercioController = require("./src/controllers/comercio.controller");
const productoController = require("./src/controllers/producto.controller");
const categoriaController = require("./src/controllers/categoria.controller");

// ------------------------------------------------------------------------------
// Zona de ruteo

// Rutas usuario
app.post("/usuario/registrar", userController.registerUser);
app.post("/login", userController.loginUser);

app.get("/usuario/:id", userController.getUserById);
app.get("/usuario", userController.getAllUsers);
app.delete("/usuario/:id", userController.deleteUser);
app.put("/usuario/editar/:id", userController.editUser);

// Rutas categoría
app.post("/categoria/registrar", categoriaController.registerCategoria);
app.delete("/categoria/eliminar/:id", categoriaController.deleteCategoria);
app.put("/categoria/editar/:id", categoriaController.editCategoria);
app.get("/categorias", categoriaController.getAllCategorias);
app.get("/categoria/:id", categoriaController.obtenerCatById);

// Rutas comercio
app.post("/comercio/registrar/:id", comercioController.registerStore);
app.get("/comercio/:id", comercioController.getStoreById);
app.get("/comercio/owner/:id", comercioController.getStoreByOwnerId);
app.get("/comercio", comercioController.getAllStores);
app.delete("/comercio/:id", comercioController.deleteStore);

// Rutas producto
app.post("/producto/registrar/:id", upload.array("imgProducto"), productoController.registerProduct);
app.get("/producto/:id", productoController.getProductById);
app.get("/producto", productoController.getAllProducts);
app.delete("/producto/:id", productoController.deleteProducto);
app.put("/producto/editar/:id", upload.array("imgProducto"), productoController.editarProducto);
app.get("/producto/comercio/:id", productoController.getProductsByStoreId);

// ------------------------------------------------------------------------------
// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
