return {
  name: '4k',
  premium: true,
  description: 'nsfw',
  cooldown: 5,
   guildOnly: true,
  async execute(message) {
    if (!message.channel.nsfw) return message.channel.send(`🚫 | **${message.author.username}**, this is a nsfw command use this in a channel marked nsfw`)
    const body = await fetch('https://nekobot.xyz/api/image?type=4k').then(res => res.json());
    const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle('444k')
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setImage(body.message)
      .setFooter(`hope you like it`);
    message.channel.send(embed);
  },
};