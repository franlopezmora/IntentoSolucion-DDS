import express from 'express';
import sequelize from './db.js';
import StarbucksStore from './models/stores.js';
import countries from './data/countries.js';

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
    try{
        const {texto, hemisferio} = req.query;
        const locales = await StarbucksStore.findAll({ limit: 15 });

        const localesTransformados = locales.map(local => {
            const hemisferio = calcularHemisferio(local.latitud, local.longitud)
            const paisCompleto = countries[local.country] || local.country;
    
            return{
                nombre: local.storeName,
                direccion: local.storeAddress,
                ciudad: local.city,
                pais: paisCompleto,
                hemisferio: hemisferio,
            };
        });
        const localesFiltrados = localesTransformados.filter(local => {
            const coincideTexto = 
                !texto ||
                local.nombre.toLowerCase().includes(texto.toLowerCase()) ||
                local.ciudad.toLowerCase().includes(texto.toLowerCase());
            
            const coincideHemisferio = 
                !hemisferio || local.hemisferio === hemisferio;

            return coincideTexto && coincideHemisferio;
        });

        res.json(localesFiltrados);
    } catch(error) {
        res.status(500).json({error: 'Error al obtener los locales'});
    }

});




(async function start() {
    // Validar conexión a la base de datos.

    try {
        await sequelize.authenticate();
        console.log('Conexión exitosa. . .');
        }catch(error){
            console.log('Error. . .', error)
        }
    
    // Iniciar el servidor
    app.listen(PORT, () => {
        console.log(`Servidor iniciado y escuchando en el puerto ${PORT}`);
    });
})();
