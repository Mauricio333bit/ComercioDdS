const { v4: uuidv4 } = require("uuid");
class Imagen {
  constructor(fk_idProducto, bites, descripcion, url) {
    this.idImagen = uuidv4();
    this.fk_idProducto = fk_idProducto;
    this.bites = bites;
    this.descripcion = descripcion;
    this.url = url;
  }

  static fromJSONtoObjectImagen(dataImagen) {
    let nuevaImagen = new Imagen(
      dataImagen.fk_idProducto,
      dataImagen.idImagen,
      dataImagen.bites,
      dataImagen.descripcion,
      dataImagen.url
    );

    return nuevaImagen;
  }
}
function guardarImagen(dataBody) {
  const ImagenNuevo = Imagen.fromJSONtoObjectImagen(dataBody);

  let ImagensRegistrados = obtenerObjetosBD("../db/imagen.txt");

  ImagensRegistrados.push(ImagenNuevoNuevo);
  escribirObjetosBD("../db/imagen.txt", ImagenNuevo);

  return ImagenNuevo;
}

//Metodos para consultar bd. path-> ruta del archivo .txt--------------------------------------------------------
function obtenerObjetosBD(path) {
  let stringDeObjetos = fs.readFileSync(path, "utf-8");
  if (!stringDeObjetos.trim()) {
    console.log("El archivo está vacío.");
    return []; // Retorna un array vacío cuando aun no se cargan productos
  }
  let objetosEnBD = JSON.parse(stringDeObjetos);

  return objetosEnBD;
}

function escribirObjetosBD(path, objeto) {
  if (!path || !objeto) {
    return false;
  }
  fs.writeFileSync(path, JSON.stringify(objeto));
  return true;
}
module.exports = {
  guardarImagen,
};
