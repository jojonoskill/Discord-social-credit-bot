require('dotenv').config();
const { Client,GatewayIntentBits, Routes,REST} = require('discord.js');//discord main importer
const commands = require('./commands.js');
const updateSocialCredit = require('./db');
const gptPrompt = require('./prompt');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,                                   //client imports(important)
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageTyping
  ]
});

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_API_KEY);

client.login(process.env.DISCORD_API_KEY);
//login

client.on('ready',()=>{                                     //первый запуск
  console.log('bot has logged in');
})

const commandCreate = {
  'showcredit': async (interaction)=> {
    const memberID = await parseInt(interaction.options.data[0].value.replace(/\D+/g, ''));  //<@1118288796019081376>
    const currentSocialCredit = await updateSocialCredit(memberID, 0);
    await interaction.reply (`Social credit of this player : ${currentSocialCredit}`);
  },
}

client.on('interactionCreate',async (interaction)=>{
  if(!interaction.isChatInputCommand()) return;
  commandCreate[interaction.commandName](interaction);
});                         //slash command interaction

client.on('messageCreate', async (interaction)=>{
  if (interaction.author.id !== '1118288796019081376') {
    const addedSocialCredit = await gptPrompt(interaction.content)
    console.log(addedSocialCredit);
    const currentSocialCredit = await updateSocialCredit(parseInt(interaction.author.id), parseInt(addedSocialCredit));
  }
});

(async () => {
  console.log('Started refreshing application (/) commands.');
  try{
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID),
        { body: commands });
    console.log('Successfully reloaded application (/) commands.');
  }catch (err){
    throw err;
  }
})();                       //slash command builder

