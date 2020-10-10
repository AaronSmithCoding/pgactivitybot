exports.run = async(client, message, args) =>
{
	client.emit('userAdd', message.member);
};

exports.help =
{
	name: `newmember`
}