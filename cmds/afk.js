const moment = require("moment");
return {
	name: 'afk',
	description: 'Become AFK',
	async execute(message, args) {
    let reason = args.join(' ') || 'I am currently afk, I will reply as soon possible.';
    let isAFK = userDB(message.author.id).afk
    const time = moment.utc(message.createdAt).format('HH:mm:ss')
    if (!isAFK) {
      userDB(message.author.id, "afk", [time,reason])
      message.channel.send("I have succesfully set you as afk");
    }
  }
};