const express = require('express');
const app = express();
const port = 3000;
const { insertarFilaEnNotion } = require('./notion');

const XLSX = require('xlsx');
const fs = require('fs');

// Variables globales para los datos y el libro de Excel
const data = [
  ['Numero', 'Down', 'Tipo de jugada', 'Yardas G/P']
];
let jugada = 1;
const workbook = XLSX.utils.book_new();

// Función para crear el archivo de Excel inicial
function crearExcel() {
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
  XLSX.writeFile(workbook, 'datos.xlsx');
  console.log('Archivo de Excel creado correctamente');
}
crearExcel();

// Función para sobreescribir el archivo de Excel con nuevos datos
function Sobreescribir(datos) {
  const newWorksheet = XLSX.utils.aoa_to_sheet(datos);
  workbook.Sheets[workbook.SheetNames[0]] = newWorksheet;
  XLSX.writeFile(workbook, 'datos.xlsx');
  console.log('Archivo de Excel actualizado correctamente');
}


// Configuración de Express
app.use(express.json()); // Para parsear JSON en las solicitudes POST

// Ruta POST para sobreescribir el archivo de Excel
app.post('/actualizar', (req, res) => {
  const nuevosDatos = req.body.datos; // Suponiendo que envías los datos en el cuerpo como JSON

  const notion_data = {
    numero: jugada.toString(),
    down: nuevosDatos[0],
    tipo_jugada: nuevosDatos[1],
    yardas: nuevosDatos[2]
  };
  insertarFilaEnNotion(notion_data);
  // lista
  // Llamar a la función para sobreescribir el archivo de Excel con los nuevos datos
  data.push(nuevosDatos)
  nuevosDatos.unshift(jugada);
    jugada++;
  Sobreescribir(data);
  res.send('Actualizacion correcta');
});

// Iniciar el servidor Express
app.listen(port, () => {
  console.log('Servidor escuchando en http://localhost:${port}');
});

