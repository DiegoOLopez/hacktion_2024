// Importamos la libreria de express
const express = require('express');
// Importamos la libreria de cors
const cors = require('cors');
// Dentro de la variable app, agregamos la funcion express
const app = express();
app.use(cors())
// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// Le asignamos el puerto 3000
const port = 3000;
// Importamos la funcion insertar fila en notion
const { insertarFilaEnNotion } = require('./notion');
// Importamos la funcion de recopilar informaciòn de la sentencia
const { recopilacion_de_sentencia } = require('./sentencia');

// Importamos la libreria de xlsx que es la libreria de excel
const XLSX = require('xlsx');
// Importamos la libreria de fs para crear los archivos
const fs = require('fs');

// Declaramos una variable global 'data' que contiene las filas iniciales del archivo Excel
const data = [
  ['Numero', 'Down', 'Tipo de jugada', 'Yardas G/P']
];
// Creamos la variable jugada para ir recopilando informacion de la primera jugada
let jugada = 1;

// Creamos un nuevo libro de Excel y lo almacenamos en la variable 'workbook'
const workbook = XLSX.utils.book_new();

// Función para crear el archivo de Excel inicial
function crearExcel() {
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
  XLSX.writeFile(workbook, 'datos.xlsx');
  console.log('Archivo de Excel creado correctamente');
}

// Llamamos a la función 'crearExcel' para generar el archivo inicial
crearExcel();

// Función para sobreescribir el archivo de Excel con nuevos datos
function Sobreescribir(datos) {
  const newWorksheet = XLSX.utils.aoa_to_sheet(datos);
  workbook.Sheets[workbook.SheetNames[0]] = newWorksheet;
  XLSX.writeFile(workbook, 'datos.xlsx');
  console.log('Archivo de Excel actualizado correctamente');
}


// Configuración de Express para analizar JSON en las solicitudes POST
app.use(express.json());

// Ruta POST para manejar solicitudes en '/enunciado'
app.post('/enunciado', async (req, res) => {
  // Extraemos el texto de la sentencia desde el cuerpo de la solicitud
  const sentencia_txt = req.body.transcripcion; 
  
  try {
    // Procesamos la sentencia utilizando la función 'recopilacion_de_sentencia'
    const resultado = await recopilacion_de_sentencia(sentencia_txt);
    console.log(resultado[0]);
    
    // Preparamos los datos para ser insertados en Notion
    const notion_data = {
      numero: jugada.toString(),
      down: resultado[0],
      tipo_jugada: resultado[1],
      yardas: resultado[2]
    };

    // Creamos un array con los datos de la jugada actual
    let array = [];
    array.push(jugada);
    array.push(resultado[0]);
    array.push(resultado[1]);
    array.push(resultado[2]);

    // Insertamos los datos en Notion, comentamos esta linea ya que de momento no usaremos las bases de datos de notion pero se deja la lògica por si acaso
    //insertarFilaEnNotion(notion_data);

    // Incrementamos el contador de jugadas
    jugada++;

    // Agregar nuevos datos al arreglo principal y sobreescribir el archivo Excel
    data.push(array);
    Sobreescribir(data);
    // Enviamos una respuesta de éxito al cliente
    res.json('Actualización correcta');
  } catch (error) {
    // En caso de error, lo registramos en la consola y enviamos una respuesta de error
    console.error('Error:', error);
    res.status(500).json('Error al procesar la solicitud');
  }
});
// Inicia el servidor Express y lo configura para escuchar en el puerto especificado
app.listen(port, () => {
  console.log('Servidor escuchando en http://localhost:${port}');
});

