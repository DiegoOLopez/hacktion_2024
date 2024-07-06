const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

const XLSX = require('xlsx');

// Datos que queremos escribir en el archivo de Excel
const data = [
  ['Numero', 'Down', 'Tipo de jugada', 'Yardas G/P'],
];

// Crear un nuevo libro de Excel
const workbook = XLSX.utils.book_new();

// Convertir los datos en una hoja de trabajo
const worksheet = XLSX.utils.aoa_to_sheet(data);

// Añadir la hoja de trabajo al libro de Excel
XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');

// Escribir el libro de Excel en un archivo
XLSX.writeFile(workbook, 'datos.xlsx');

console.log('Archivo de Excel creado correctamente');

