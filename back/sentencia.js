const express = require('express');
const app = express();
const port = 3000;
// se agrega la libreria de geminis
const { GoogleGenerativeAI } = require("@google/generative-ai");
//TODO se tiene que agregar esto en una variable de entorno
//aqui se agrega el token
const genAI = new GoogleGenerativeAI("AIzaSyDbG0KxTyTKLbuTNfkyGnGsr6Ro4Tcdlcg");
//se selecciona el tipo de modelo
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


//se llama a la IA con la sentencia que se recupera del front
async function recopilacion_de_sentencia(sentencia) {

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  const prompt = "De la siguiente sentencia: "+ sentencia + ", regresame el siguiente formato, y solo ponlo entre corchetes, no quiero que digas nadax: ['Down (primer, segundo, tercero, cuarto', 'tipo de jugada (pase, carrera)', 'yardas (positivas o negativas y el numero)']"
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const texto = response.text();
  // Eliminar los corchetes inicial y final
const textoSinCorchetes = texto.slice(1, -1);

// Dividir la cadena por comas
const elementos = textoSinCorchetes.split(',');

// Eliminar los espacios en blanco y las comillas alrededor de los elementos
const array = elementos.map(elemento => elemento.trim().replace(/^['"]|['"\]]$/g, ''));

  return array;
}

module.exports = { recopilacion_de_sentencia};