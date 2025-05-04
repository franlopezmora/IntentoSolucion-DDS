import express from 'express';
import sequelize from './db.js';
import StarbucksStore from './models/stores.js';
import countries from './data/countries.js';

function calcularHemisferio(lat, lon) {
  const ns = lat >= 0 ? "N" : "S";
  const ew = lon >= 0 ? "E" : "O";
  return ns + ew;
}

const app = express(); // 👈 ESTA línea tiene que venir antes de app.get
const PORT = 3000;

app.use(express.static('public')); // sirve archivos estáticos (HTML, JS, etc.)
app.get('/api/locales', async (req, res) => {
    try {
      const { texto, hemisferio } = req.query;
      const hemisferioFiltro = (hemisferio || "").toUpperCase().trim();
  
      const locales = await StarbucksStore.findAll({ limit: 500 });
  
      const localesTransformados = locales.map(local => {
        const hemisferioCalculado = calcularHemisferio(local.latitud, local.longitud);
        const paisCompleto = countries[local.country] || local.country;
  
        return {
          nombre: local.storeName,
          direccion: local.storeAddress,
          ciudad: local.city,
          pais: paisCompleto,
          hemisferio: hemisferioCalculado
        };
      });
  
      const localesFiltrados = localesTransformados.filter(local => {
        const coincideTexto =
          !texto ||
          local.nombre.toLowerCase().includes(texto.toLowerCase()) ||
          local.ciudad.toLowerCase().includes(texto.toLowerCase());
  
        const coincideHemisferio =
          !hemisferioFiltro || local.hemisferio === hemisferioFiltro;
  
        return coincideTexto && coincideHemisferio;
      });
  
      res.json(localesFiltrados.slice(0, 15));
    } catch (error) {
      console.error("❌ Error al procesar locales:", error);
      res.status(500).json({ error: "Error al obtener locales" });
    }
  });
  
  
(async function start() {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa. . .');
  } catch (error) {
    console.log('Error al conectar a la base de datos:', error);
  }

  app.listen(PORT, () => {
    console.log(`Servidor iniciado y escuchando en el puerto ${PORT}`);
  });
})();
