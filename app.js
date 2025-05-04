import express from 'express';
import sequelize from './db.js';
import StarbucksStore from './models/stores';

function calcularHemisferio(lat, lon) {
    const ns = lat >= 0 ? "N" : "S"; // Norte o Sur
    const ew = lon >= 0 ? "E" : "O"; // Este o Oeste
    return ns + ew; // Ej: "NE", "SO", etc.
  }

const app = express();
const PORT = 3000;

app.use(express.static('public'));

// Programar endpoints aquí
app.get('/api/locales', async (req, res) => {
    const {texto, hemisferio} = req.query;
    const locales = await StarbucksStore.findall();
});




(async function start() {
    // Validar conexión a la base de datos.

    try {
        await sequelize.authenticate;
        console.log('Conexión exitosa. . .');
        }catch(error){
            console.log('Error. . .', error)
        }
    
    const localesTransformados = locales.map(local => {
        const hemisferio = calcularHemisferio(local.LATITUD, local.LONGITUD)
        const paisCompleto = countries[local.COUNTRY] || local.COUNTRY;

        return{
            nombre: local.STORE_NAME,
            direccion: local.STREET_ADDRESS,
            ciudad: local.CITY,
            pais: paisCompleto,
            hemisferio: hemisferio,
        };
    });
    
    // Iniciar el servidor
    app.listen(PORT, () => {
        console.log(`Servidor iniciado y escuchando en el puerto ${PORT}`);
    });
})();
