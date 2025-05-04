document.getElementById("btnBuscar").addEventListener("click", () => {
    const texto = document.getElementById("filtroTexto").value;
    const hemisferio = document.getElementById("filtroHemisferio").value;
    const url = `/api/locales?texto=${encodeURIComponent(texto)}&hemisferio=${encodeURIComponent(hemisferio)}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            cargarTabla(data);
        })
        .catch(err => console.log("Error al obtener locales:", err));
});

function cargarTabla(locales) {
    const cuerpo = document.getElementById("tablaLocales");
    cuerpo.innerHTML = "";

    if (locales.length === 0) {
        const fila = `
            <tr>
                <td colspan="5" class="text-center text-muted">No se encontraron locales.</td>
            </tr>
        `;
        cuerpo.innerHTML = fila;
        return;
    }

    locales.forEach(local => {
        const fila = `
          <tr>
            <td>${local.nombre}</td>
            <td>${local.direccion}</td>
            <td>${local.ciudad}</td>
            <td>${local.pais}</td>
            <td>${local.hemisferio}</td>
          </tr>
        `;
        cuerpo.innerHTML += fila;
      });
}