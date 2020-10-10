module.exports = (client, member) =>
{
	let userLogs = member.guild.channels.cache.find(c => c.name === 'testing-pgactivitybot');

	userLogs.send(`${member.user.tag} has joined **${member.guild}**!`);
};