const { Client, MessageEmbed  } = Discord
const { Aki } = require('aki-api');
const emojis = ["👍", "👎", "❔", "🤔", "🙄", "❌"]

return {
  name: 'akinator',
  description: 'hey aki',
  cooldown: 5,
  async execute(message,args) {
  const correctemoji = await message.client.emojis.cache.get("773447536689938463");
const region = 'en';
   const aki = new Aki(region);
      await aki.start();
const msg = await message.channel.send(new MessageEmbed().setTitle(`${message.author.username}, Question ${aki.currentStep + 1}`)
.setColor("RANDOM")
.setDescription(`**${aki.question}**\n${aki.answers.map((x, i) => `${x} | ${emojis[i]}`).join("\n")}`));
for(let emoji of emojis)await msg.react(emoji).catch(console.error);
const collector = msg.createReactionCollector((reaction, user) => emojis.includes(reaction.emoji.name) && user.id === message.author.id,{ time: 60000 * 6 });
      collector.on("collect", async (reaction, user) => {
      reaction.users.remove(user).catch(console.error);
if(reaction.emoji.name == "❌")return collector.stop();

await aki.step(emojis.indexOf(reaction.emoji.name));
if (aki.progress >= 70 || aki.currentStep >= 78) {
          await aki.win();
          collector.stop();
          message.channel.send(new MessageEmbed()
              .setTitle("Is this your character?")
              .setDescription(`**${aki.answers[0].name}**\n${aki.answers[0].description}\nRanking as **#${aki.answers[0].ranking}**\n\n[yes (**y**) / no (**n**)]`)
              .setImage(aki.answers[0].absolute_picture_path)
              .setColor("RANDOM"));
message.channel.awaitMessages(response => ["yes","y","no","n"].includes(response.content.trim().toLowerCase()) &&
response.author.id == message.author.id, { max: 1, time: 30000, errors: ["time"] })
        .then(collected => {
           const content = collected.first().content.trim().toLowerCase();
              if (content == "y" || content == "yes")
                   return message.channel.send(new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`${correctemoji} Great! Guessed it right `)
                    .setDescription("I love playing with you!"));
              else 
                  return message.channel.send(new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle("Uh. you win")
                    .setDescription("I love playing with you!"));
            });
          return;
        }
         msg.edit(new MessageEmbed()
                  .setTitle(`${message.author.username}, Question ${aki.currentStep + 1}`)
                  .setColor("RANDOM")
                  .setDescription(`**${aki.question}**\n${aki.answers.map((x, i) => `${x} | ${emojis[i]}`).join("\n")}`));
   });
  
  
collector.on("end",()=>{
                         msg.delete({ timeout: 1000 }).catch(()=>{});
                       });   
  },
};