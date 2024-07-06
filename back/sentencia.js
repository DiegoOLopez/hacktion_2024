const express = require('express');
//const { Chat } = require('openai/src/resources/index.js');
const app = express();
const port = 3000;
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyDbG0KxTyTKLbuTNfkyGnGsr6Ro4Tcdlcg");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


// const prompt = "Write a story about a magic backpack.";

// const result = await model.generateContent(prompt);
// console.log(result.response.text());

async function recopilacion_de_sentencia(sentencia) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
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