exports.run = async (client, message, args) =>
{
 let number = args[0];
 if(number > 100) number = 100;
 message.channel.messages.fetch({ limit: number })
  .then( messages =>
  {
      console.log(`Received ${messages.size} messages`);
      message.channel.bulkDelete(messages);
  })
  .catch(console.error);
};

exports.help =
{
	name: `clear`
}