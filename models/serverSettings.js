const mongoose = require('mongoose');

const serverSettingsSchema = mongoose.Schema(
{
	_id: String,
	guildName: String,
	xpPerMessage: Number,
	xpPerVoiceMinute: Number,
	messageCooldown: Number,
	allowSoloVoice: Boolean
});

module.exports = mongoose.model('ServerSettings', serverSettingsSchema);