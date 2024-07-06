const express = require('express');
//const { Chat } = require('openai/src/resources/index.js');
const app = express();
const port = 3000;
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyDbG0KxTyTKLbuTNfkyGnGsr6Ro4Tcdlcg");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

// const prompt = "Write a story about a magic backpack.";

// const result = await model.generateContent(prompt);
// console.log(result.response.text());

async function run() {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const prompt = "De la siguiente sentencia: Segundo down pase completo de 5 yardas, el tipo de pase, y la yarda, regresame el siguiente formato, y solo ponlo entre corchetes, no quiero que digas nadax: ['Down (primer, segundo, tercero, cuarto', 'tipo de jugada (pase, carrera)', 'yardas (positivas o negativas y el numero)']"

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();