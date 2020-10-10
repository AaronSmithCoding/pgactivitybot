exports.run = async (client, message) =>
{
	await client.getUser(client, message, user =>
	{
		if(user)
		{
			message.delete();
			message.channel.send({embed: 
			{
                color: 3447003,
                title: `${user.userName}`,
                fields: [{
                    name: `XP`,
                    value: `${user.xp}`
                  }
                ]
              }
            });
		}
	});
};

exports.help =
{
	name: `stats`
}