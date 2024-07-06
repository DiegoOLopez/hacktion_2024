const express = require('express');
const app = express();
const port = 3000;
const { insertarFilaEnNotion } = require('./notion');
const { recopilacion_de_sentencia } = require('./sentencia');

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

app.post('/enunciado', async (req, res) => {
  const sentencia_txt = req.body.transcripcion; // Suponiendo que envías los datos en el cuerpo como JSON
  
  try {
    const resultado = await recopilacion_de_sentencia(sentencia_txt);
    console.log(resultado[0]);
    
    const notion_data = {
      numero: jugada.toString(),
      down: resultado[0],
      tipo_jugada: resultado[1],
      yardas: resultado[2]
    };
    let array = [];
    array.push(jugada);
    array.push(resultado[0]);
    array.push(resultado[1]);
    array.push(resultado[2]);
    insertarFilaEnNotion(notion_data);

    // Agregar número de jugada a los nuevos datos y actualizar el contador
    jugada++;

    // Agregar nuevos datos al arreglo principal y sobreescribir el archivo Excel
    data.push(array);
    Sobreescribir(data);

    res.send('Actualización correcta');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error al procesar la solicitud');
  }
});
// Iniciar el servidor Express
app.listen(port, () => {
  console.log('Servidor escuchando en http://localhost:${port}');
});

