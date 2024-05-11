const express = require('express');
const router = express.Router();
const { checkAdmin, checkAccess, checkLogin } = require('../middleware/auth');
const User = require('../models/User');
const Bots = require('../models/Bots');
const { MessageEmbed } = require('discord.js');

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.id });
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }
    res.status(200).json({
      message: 'User found',
      user
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving user',
      error: error.message
    });
  }
})

router.get('/:id/bots', checkLogin, async (req, res) => {
  const Userr = await User.findOne({ userId: req.user.id });
  const bots = await Bots.find({ botAccess: Userr.userId });
  if (!bots) {
    res.render('error', {
      message: 'You do not have access to any bots'
    })
  } else {
    res.render('bots', {
      bots
    })
  }
})

router.get('/:id/bots/:id', checkLogin, async (req, res) => {
  const Userr = await User.findOne({ userId: req.user.id });
  const bot = await Bots.findOne({ botId: req.params.id });
  if (!bot) {
    res.render('error', {
      message: 'Bot not found'
    })
  } else {
    res.render('bot', {
      bot
    })
  }
});

router.get('/:id/bots/:id/edit', checkLogin, async (req, res) {
  const Userr = await User.findOne({ userId: req.user.id });
  const bot = await Bots.findOne({ botId: req.params.id });
  if (!bot) {
    res.render('error', {
      message: 'Bot not found'
    })
  } else {
    res.render('edit', {
      bot
    })
  }
})

router.post('/:id/bots/:id/edit', checkLogin, async (req, res) => {
  const Userr = await User.findOne({ userId: req.user.id });
  const bot = await Bots.findOne({ botId: req.params.id });
  if (!bot) {
    res.render('error', {
      message: 'Bot not found'
    })
  } else {
    res.render('edit', {
      bot
    })
  }
})

router.get('/:id/bots/:id/delete', checkLogin, async (req, res) {
  const Userr = await User.findOne({ userId: req.user.id });
  const bot = await Bots.findOne({ botId: req.params.id });
  if (!bot) {
    res.render('error', {
      message: 'Bot not found'
    })
  } else {
    res.render('delete', {
      bot
    })
  }
})

router.post('/:id/bots/:id/delete', checkLogin, async (req, res) => {
  const Userr = await User.findOne({ userId: req.user.id })
  const bot = await Bots.findOne({ botId: req.params.id });
  if (!bot) {
    res.render('error', {
      message: 'Bot not found'
    })
  } else {
    res.render('delete', {
      bot
    })
  }
});

module.exports = router;