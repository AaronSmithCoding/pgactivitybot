//import schemas
const mongoose = require('mongoose');
let UserModel = require('../models/user');
let ServerSettings = require('../models/serverSettings');

module.exports = client =>
{
	client.tryUpdateXP = async(client, message) =>
	{
        //get server settings
        await client.getServerSettings(client, message, settings =>
        {
            if(settings)
            {
                //get user data
                client.getUser(client, message, user =>
                {
                    console.log("GetUSer callback: Returns User");
                    if(user)
                    {
                        console.log("User is valid");
                        //get time of last xp updated
                        var lastUpdated = new Date(user.timeXpLastUpdated);
                        var currentTime = new Date();
                        var seconds = (currentTime.getTime() - lastUpdated.getTime()) / 1000;
                        console.log(`Last Updated: ${lastUpdated}`);
                        console.log(`Current Time: ${currentTime}`);
                        console.log(`Diff in secs: ${seconds}`);
                        //check if elapsed time meets cooldown
                        if(seconds > settings.messageCooldown)
                        {
                             //apply update if valid
                             const newXp = user.xp + settings.xpPerMessage;
                            let data = 
                            {
                                key1: `xp`,
                                value1: newXp,
                                key2: `timeXpLastUpdated`,
                                value2: currentTime.toISOString()
                            };
                            client.tryUpdateUserXP(client, message, data);
                        }

                           
                    }
                    else
                    {
                        //add a new user with the base xp and current date
                        var currentdate = new Date(); 
                        const newUser = 
                        {
                            guildID: message.guild.id,
                            userGUID: message.author.id,
                            userName: message.author.username,
                            xp: settings.xpPerMessage,
                            timeXpLastUpdated: currentdate.toISOString()
                        }
                        console.log("User invalid so creating one with new data");
                        let userStr = JSON.stringify(newUser);
                        console.log(userStr);
                        client.addUser(newUser, user =>
                        {
                            console.log("Added user to the database");
                        });
                    }
                });
            }
        });
        
		console.log(`trying to update XP for ${message.author.username}`);
	};
};