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
				title: "Setup Help",
				fields: [{
				name: `xpPerMessage ${settings.xpPerMessage}`,
				value: `type !!setxppermessage [number] to change the value`
				},
				{
				name: `xpPerVoiceMinute ${settings.xpPerVoiceMinute}`,
				value: `type !!setxppervoiceminute [number] to change the value`
				},
				{
				name: `messageCooldown ${settings.messageCooldown}`,
				value: `type !!setmessagecooldown [number] to change the value`
				},
				{
				name: `allowSoloVoice ${settings.allowSoloVoice}`,
				value: `type !!setallowsolovoice [number] to change the value`
				}]}
			});
		}
	});
};

exports.help =
{
	name: `serverhelp`
}