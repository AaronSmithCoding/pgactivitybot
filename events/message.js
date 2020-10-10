const config = require('../js/config.js');

module.exports = (client, message) =>
{

	//look at messages being sent and repeat
	if(message.author.bot) return;
	if(message.content.indexOf(config.prefix) !== 0) 
	{
		client.tryUpdateXP(client, message);
	}
	else
	{
		console.log("Inside CMD MESSAGE");
		const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
		const command = args.shift().toLowerCase();

		const cmd = client.commands.get(command);
		console.log(`cmd found ${cmd}`);
		if(!cmd) return;

		cmd.run(client, message, args);	
	}
	
};