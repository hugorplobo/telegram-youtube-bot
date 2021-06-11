# telegram-youtube-bot

![Bot demonstration](https://i.imgur.com/9Cfc3WJ.gif)

A telegram bot to download musics from youtube. You can check it online [here](https://t.me/ytbmp3_bot) (@ytbmp3_bot).

## How it was made

The bot is written in JavaScript, using the [tgfancy](https://github.com/GochoMugo/tgfancy) lib to communicate with Telegram API and [ytdl-core](https://github.com/fent/node-ytdl-core) to download the videos.

## Usage

There are only two commands available: **start** and **help**. Both show the start message. Any other message is interpreted as a URL. If it's not possible to resolve the URL, an appropriate message is sent, informing the user of the invalidity of the video.

## How to host

You can host your own bot very simple:

1. Talk with [Bot Father](https://t.me/BotFather) (@BotFather).
2. Create a new bot and save the token. Don't share this token with anyone!

3. Download this repository or fork it.
4. Create a [Heroku](https://www.heroku.com) account.
5. Create a new app in Heroku.
6. Deploy this repository using Github or Heroku CLI
7. Set the bot token in Heroku's eviroment variables and your bot is up!
