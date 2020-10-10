//import schemas
const mongoose = require('mongoose');
let UserModel = require('../models/user');
let ServerSettings = require('../models/serverSettings');

module.exports = client =>
{

    client.getServerSettings = async(client, message, callback) =>
    {
        const query  = ServerSettings.where({ _id: message.guild.id });
        query.findOne(function (err, settings) {
          if (err) return console.log(err);
          if (settings) 
          {
           callback(settings);
          }
        });
    };

    client.reset = async(client, message) =>
    {
        const filter = { _id: message.guild.id };
        //get defaults for server
        let xpPerMessage = 'xpPerMessage';
        let xpPerVoiceMinute = 'xpPerVoiceMinute';
        let messageCooldown = 'messageCooldown';
        let allowSoloVoice = 'allowSoloVoice';
        let xpPerMessageValue = client.config.XPPerMessage;
        let xpPerVoiceValue = client.config.XPPerVoice;
        let messageCooldownValue = client.config.MessageCooldown;
        let allowSoloVoiceValue = client.config.AllowSoloVoice;
        var update ={};
        update[xpPerMessage] = xpPerMessageValue;
        update[xpPerVoiceMinute] = xpPerVoiceValue;
        update[messageCooldown] = messageCooldownValue;
        update[allowSoloVoice] = allowSoloVoiceValue;

        ServerSettings.findOneAndUpdate(filter, update, {new: true, upsert: false, rawResult:true},function(err) 
        {
            if(err)
            {
                message.channel.send(`Failed to Update! check the key was valid!`);
            }
            else
            {
                message.delete();
                message.channel.send({embed: {
                        color: 3447003,
                        title: `Server Settings Reset`,
                        description: `!!serverinfo to view the new settings`
                      }
                });
            }
        });     

                
    };

	client.tryUpdateServerSettings = async(client, message, data) =>
	{
        let key = data.key;
        let value = data.value;
        const filter = { _id: message.guild.id };
        var update = {};
        update[key] = value;

        ServerSettings.findOneAndUpdate(filter, update, {new: true, upsert: false, rawResult:true},
            function(err) 
        {
            if(err)
            {
                message.channel.send(`Failed to Update! check the key was valid!`);
            }
            else
            {
                message.delete();
                message.channel.send({embed: {
                        color: 3447003,
                        title: `${key} Updated`,
                        description: `New value = ${value}`
                      }
                    });
            }
        });		
	};

	client.trySetUp = async(client, message) =>
	{
		console.log("Inside call TrySetUp");
		//check if the server settings already exist
		const query  = ServerSettings.where({ _id: message.guild.id });
		query.findOne(function (err, entry) 
		{
            if (err) return console.log(err);
            if (entry) 
            {
                message.delete();
                message.channel.send({embed: {
                        color: 3447003,
                        title: "Setup Invalid",
                        description: "Server already has been setup. \n!!resetsettings to " +
                        "reset the values back to defaults \n!!serverinfo to view values" +
                        "\n!!serverhelp to get more help"
                      }
                    });
            // doc may be null if no document matched
            }
            else
            {
                //get defaults for server
                let xpPerMessage = client.config.XPPerMessage;
                let xpPerVoice = client.config.XPPerVoice;
                let messageCooldown = client.config.MessageCooldown;
                let allowSoloVoice = client.config.AllowSoloVoice;
                console.log("no entry entry for GUILD!");
                
                let defaultValues = {
                    _id: message.guild.id,
                    guildName: message.guild.name,
                    xpPerMessage: xpPerMessage,
                    xpPerVoiceMinute: xpPerVoice,
                    messageCooldown: messageCooldown,
                    allowSoloVoice: allowSoloVoice
                };
                console.log(defaultValues);
                const newServerSettings = new ServerSettings(defaultValues);
                return newServerSettings.save()
                    .then(() =>
                    {
                        message.delete();
                        message.channel.send({embed: {
                        color: 3447003,
                        title: "Setup Complete",
                        fields: [{
                            name: `xpPerMessage ${newServerSettings.xpPerMessage}`,
                            value: `type !!setxppermessage [number] to change the value`
                          },
                          {
                            name: `xpPerVoiceMinute ${newServerSettings.xpPerVoiceMinute}`,
                            value: `type !!setxppervoiceminute [number] to change the value`
                          },
                          {
                            name: `messageCooldown ${newServerSettings.messageCooldown}`,
                            value: `type !!setmessagecooldown [number] to change the value`
                          },
                          {
                            name: `allowSoloVoice ${newServerSettings.allowSoloVoice}`,
                            value: `type !!setallowsolovoice [number] to change the value`
                          },
                        ]
                      }
                    });
                });
            }
        });	
	};
};


// message.channel.send(`Server settings reset. !!serverinfo to show new values`)
//                 .then( newmessage =>
//                 {
//                     newmessage.delete({ timeout: 5000 });
//                 });