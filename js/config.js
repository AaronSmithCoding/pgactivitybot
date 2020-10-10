require ('dotenv-flow').config();

	var config = 
	{
		"token": process.env.Token,
		"prefix": process.env.Prefix,
		"mongoURI": process.env.MongoURI,
		"XPPerMessage": process.env.XPPerMessage,
		"XPPerVoice": process.env.XPPerVoice,
		"MessageCooldown": process.env.MessageCooldown,
		"AllowSoloVoice": process.env.AllowSoloVoice
	};

module.exports = config;
