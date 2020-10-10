exports.run = async (client, message, args) =>
{
	console.log("trying to call TrySetUp");
	await client.reset(client, message);
};

exports.help =
{
	name: `resetsettings`
}