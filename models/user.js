const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
{
	userGUID: String,
	guildID: String,
	userName: String,
	xp: Number,
	timeXpLastUpdated: String
});

module.exports = mongoose.model('UserModel', userSchema);