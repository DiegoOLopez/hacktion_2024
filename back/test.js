const express = require('express');
//const { Chat } = require('openai/src/resources/index.js');
const app = express();
const port = 3000;
const openai=require('openai');

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});



const opena=new openai({apikey:''});  



  
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

async function main() {
  const completion = await opena.chat.completions.create({
    messages: [{"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Who won the world series in 2020?"},
        {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
        {"role": "user", "content": "Where was it played?"}],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}
// const llamada=Chatgpt_peticion();
main();
 

