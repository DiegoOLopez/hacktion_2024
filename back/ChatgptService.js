
import OpenAI from 'openai';
const openai=new OpenAI();  


async function Chatgpt_peticion(){
response= await client.completions.create(
    model="gpt-3.5-turbo-instruct",
    prompt="Segundo down pase completo de 5 yardas, lo puedes diferenciar el down, el tipo de pase, y la yarda"
  );
  
  console.log(express.response);
  return response;
}
  