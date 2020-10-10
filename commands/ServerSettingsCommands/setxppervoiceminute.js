exports.run = (client, message, args) =>
{
	let perms = message.member.permissions;
	// Check if a member has a specific permission on the guild!
	let has_admin = perms.has("ADMINISTRATOR");

	if(has_admin)
	{
		let data = 
		{
			key: 'xpPerVoiceMinute',
			value: args[0]
		};
		client.tryUpdateServerSettings(client, message, data);
	}
	else
	{
		message.channel.send(`${message.author.username} does not have privileges`);
	}
};

exports.help =
{
	name: `setxppervoiceminute`
}