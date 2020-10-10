const Discord = require('discord.js');

exports.run = (client, message, args) =>
{
	// let response = 
	// "-----------TODO----------------- \n " +
	// "--------Server Settings--------- \n " + 
	// "clean up responses and add timeout deletes " + "\n" +
	// "----------XP TRACKING--------------- \n" +
	// "I need to track user messaging in channel, call to tryIncreaseXP \n " +
	// "get current xp level from user then add to it \n " +
	// "!!updateXPs - loop through each user and handle updating/removing xp level \n " +
	// "----------GENERAL--------------- \n" +
	// "!!help - give help and info on bot";
	//message.delete();
    //message.channel.send(response);

    ///////////////////////////////////////////////////////////////////////////////////////
   message.channel.send({embed: {
    color: 3447003,
    title: "TODO",
    description: "These are the tasks that are ",
    fields: [
      {
        name: "XP TRACKING",
        value: "create a level table \n" +
        "table include[level, XP, assign role, deassign role] \n" +
        "find current level based on xp value \n" +
        "when xp updates check level and handle any role changes \n" +
        "add to user lastdateupdated ready to check activity this week \n" +
        "!!updateXPs - loop through each user and handle updating/removing xp level"
      },
      {
        name: "GENERAL",
        value: "!!help - give help and info on bot - add !!stats for showing users level\n" +
        "create Bot Icon \n" +
        "top 10 members \n" +
        "commands for allowing bot to track channels"
      }
    ]
  }
});
};

exports.help =
{
	name: `todo`
}