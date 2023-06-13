const { Configuration, OpenAIApi } = require('openai');

require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});


const dsMessage = "i love you";
const openai = new OpenAIApi(configuration);

async function asyncFunc (){
  const chat_completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0301",
    messages: [{ role: "user", content: `i will provide you a message, 
    and you will need to rate it from 10 to -10 using following criteries: 
    intelligibility, toxicity, length and your personal opinion. 
    You need to give ONLY average rating, without any other text and without words like
    intelligibility, toxicity, length and your personal opinion. 
    Here is the message : ${dsMessage}` }],
  });
  const rating = chat_completion.data.choices[0].message.content;
  await console.log(rating);
}


asyncFunc();
