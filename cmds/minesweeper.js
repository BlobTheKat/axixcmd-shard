const Minesweeper = require('discord.js-minesweeper');

return {
	name: 'minesweeper',
	description: 'generate a minesweeper game',
  aliases: ['m','mine'],
	cooldown: 5,
	execute(message) {
if(!message.channel.guild) return message.channel.send('❌ : This IS A Guild Only Command');

     const rows = 9;
    const columns =9;
    const mines = 10;
  
  const minesweeper = new Minesweeper({ rows, columns, mines });

   const matrix = minesweeper.start();
  
  const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`MINESWEEPER ha`)
            .setDescription(matrix)
            .setThumbnail('https://imgur.com/lJ0QqxD.png')
            .setURL(`https://top.gg/bot/715178668393103420`)
            .setFooter('send your minesweeper wins to our discord');

     message.channel.send(embed);
   },
};