exports.run = async (client, message) =>
{
	await client.getServerSettings(client, message, settings =>
	{
		if(settings)
		{
			message.delete();
			message.channel.send({embed: 
			{
                color: 3447003,
                title: "Server Info",
                fields: [{
                    name: `xpPerMessage`,
                    value: `${settings.xpPerMessage}`
                  },
                  {
                    name: `xpPerVoiceMinute`,
                    value: `${settings.xpPerVoiceMinute}`
                  },
                  {
                    name: `messageCooldown`,
                    value: `${settings.messageCooldown}`
                  },
                  {
                    name: `allowSoloVoice`,
                    value: `${settings.allowSoloVoice}`
                  },
                ]
              }
            });
		}
	});
};

exports.help =
{
	name: `serverinfo`
}