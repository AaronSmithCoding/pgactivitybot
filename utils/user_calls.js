//import schemas
const mongoose = require('mongoose');
let UserModel = require('../models/user');

module.exports = client =>
{
    client.addUser = async (settings, callback) =>
    {
        const newUser = await new UserModel(settings);
        newUser.save();
        callback(newUser);
    };

    client.getUser = async(client, message, callback) =>
    {
        console.log("Trying to get user");
        console.log(`UserName: ${message.author.username} - UserGUID: ${message.author.id}`);
        const query  = UserModel.where({ guildID: message.guild.id , userGUID: message.author.id });
        query.findOne(function (err, foundUser) {
            if (err) return console.log(err);
        
            callback(foundUser);
        });
    };

    client.tryUpdateUserXP = async(client, message, data) =>
    {
        const filter = { guildID : message.guild.id , userGUID: message.author.id };

        let key1 = data.key1;
        let value1 = data.value1;
        let key2 = data.key2;
        let value2 = data.value2;
        var update = {};
        update[key1] = value1;
        update[key2] = value2;
        UserModel.findOneAndUpdate(filter,update, {new: true, upsert: false},
            function(err, doc) 
        {
            if(err)
            {
                message.channel.send(`Failed to Update! check the key was valid!`);
            }
            else
            {
                console.log(`user = ${doc.userName} Updated XP to ${doc.xp}`);
                console.log(`${message.author.username} - Updated XP to value`);
            }
        });     
    };
};
