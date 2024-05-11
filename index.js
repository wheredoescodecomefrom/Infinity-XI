const express = require('express');
const app = express();
const port = 3000
const { checkAdmin, checkAccess, checkLogin, passport } = require('./middleware/auth')
const { UserRoutes } = require('./routes/user.routes')
const { BotRoutes } = require('./routes/bot.routes')
const { UserController } = require('./controllers/user.controller');
const { BotController } = require('./controllers/bot.controller');
const { MessageEmbed } = require('discord.js');

app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.use('/user', UserRoutes);
app.use('/bot', BotRoutes);

app.get('/', async (req, res) => {
  if (req.isAuthenticated()) {
    const user = await UserController.getUser(req.user.id);
    res.render('index', {
      user
    })
  } else {
    res.render('index')
  }
})

app.get('/*', (req, res) => {
  res.render('error', {
    message: 'Page not found'
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})