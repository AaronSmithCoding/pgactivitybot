module.exports = async (client, user) =>
{
	try
	{
		const newUser = 
		{
			userId: user.id,
			userName: user.user.tag,
			xp: 10
		}
		console.log("inside userAdd");
		console.log(newUser);
		try
		{
			await client.addUser(newUser);
		}
		catch(error)
		{
			console.log(error);
		}
		
	}
	catch(error)
	{
		console.log(error);
	}
};