exports.run = async (client, message, args) =>
{
	await client.trySetUp(client, message);
};

exports.help =
{
	name: `setup`
}