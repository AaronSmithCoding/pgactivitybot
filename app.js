const { Client, Collection} = require('discord.js');
const fs = require('fs');
const client = new Client();

require('./utils/functions')(client);
require('./utils/server_setting_calls')(client);
require('./utils/user_calls')(client);

client.commands = new Collection();
client.mongoose = require('./utils/mongoose');
client.config = require('./js/config.js');


fs.readdir('./events/', async(err, files) =>
  {
    if(err) return console.error;
    files.forEach(file =>
    {
        if(!file.endsWith('.js')) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(`.`)[0];
        console.log(`Loaded Event ${eventName}.`);
        client.on(eventName, event.bind(null, client));
    });
  });

fs.readdir('./commands/ServerSettingsCommands/', async(err, files) =>
  {
    if(err) return console.error;
    files.forEach(file =>
    {
        if(!file.endsWith('.js')) return;
        let props = require(`./commands/ServerSettingsCommands/${file}`);
        let cmdName = file.split(`.`)[0].toLowerCase();
        console.log(`Loaded Command ${cmdName}.`);

        client.commands.set(cmdName, props);
    });
  });

    fs.readdir('./commands/UserCommands/', async(err, files) =>
      {
        if(err) return console.error;
        files.forEach(file =>
        {
            if(!file.endsWith('.js')) return;
            let props = require(`./commands/UserCommands/${file}`);
            let cmdName = file.split(`.`)[0].toLowerCase();
            console.log(`Loaded Command ${cmdName}.`);

            client.commands.set(cmdName, props);
        });
      });

fs.readdir('./commands/', async(err, files) =>
  {
    if(err) return console.error;
    files.forEach(file =>
    {
        if(!file.endsWith('.js')) return;
        let props = require(`./commands/${file}`);
        let cmdName = file.split(`.`)[0].toLowerCase();
        console.log(`Loaded Command ${cmdName}.`);

        client.commands.set(cmdName, props);
    });
  });


client.mongoose.init();
client.login(client.config.token); 