const passport = require('passport');
const { Strategy } = require('passport-discord');
const User = require('../models/User');
const Bots = require('../models/Bots');
const { MessageEmbed } = require('discord.js');

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new Strategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
  scope: ['identify', 'guilds']
}));

async function checkAdmin(req, res, next) {
  const user = await User.findOne({ userId: req.user.id });
  if (user.admin === true) {
    next();
  } else {
    res.status(403).send('You are not an admin');
  }
}

async function checkAccess = (req, res, next) => {
  const user = await User.findOne({ userId: req.user.id });
  const bot = await Bots.findOne({ botId: req.params.id });
  if (user.admin === true || bot.botAccess.includes(user.userId)) {
    next();
  } else {
    res.status(403).send('You are not an admin or bot owner');
  }
}

async function checkLogin(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
}

module.exports = {
  checkAdmin,
  checkAccess,
  checkLogin,
  passport
}