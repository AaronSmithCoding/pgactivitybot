const mongoose = require('mongoose');
const config = require('../js/config.js');
module.exports = 
{
	init:() =>
	{
		const dbOptions =
		{
			useNewUrlParser: true,
			autoIndex: false,
			//reconnectTries: Number.MAX_VALUE,
			//reconnectInterval: 500,
			poolSize: 5,
			connectTimeoutMS: 10000,
			family: 4,
			useUnifiedTopology: true
		};

		mongoose.connect(config.mongoURI, dbOptions);
		mongoose.set('useFindAndModify', false);
		mongoose.Promise = global.Promise;

		mongoose.connection.on('connected', () =>
		{
			console.log("Mongoose DBis connected");
		});
	}
};