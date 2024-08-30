const { v4: uuidv4 } = require("uuid");
class Imagen {
  constructor(descripcion, url) {
    this.idImagen = uuidv4();
    this.descripcion = descripcion;
    this.url = url;
  }

  static fromJSONtoObjectImagen(dataImagen) {
    let nuevoImagen = new Imagen(
      dataImagen.idImagen,
      dataImagen.descripcion,
      dataImagen.url
    );

    return nuevoImagen;
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
  let objetosEnBD = JSON.parse(stringDeObjetos);
  if (!objetosEnBD) {
    return [];
  }
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
