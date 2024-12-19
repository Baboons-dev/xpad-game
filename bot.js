const { Telegraf } = require('telegraf');
const crypto = require('crypto-js');
const web_link = 'https://tg.thelayerx.com/';
const TOKEN = '8169861892:AAHmobMRPylA7SLW9Z-kgOS7BQNZOQq6JYw';

const bot = new Telegraf(TOKEN);
var secretKey = 'LefjQ2pEXmiy/nNZvEJ43i8hJuaAnzbA1Cbn1hOuAgA=';

function random16String() {
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return String(result);
}

function encrypt(text) {
  var derived_key = crypto.enc.Base64.parse(secretKey);

  let randomInt16 = random16String();
  // Generating a random 16-digit string to be used as the initialization vector (IV)
  var iv = crypto.enc.Utf8.parse(randomInt16);

  // Encrypting
  var payload = crypto.AES.encrypt(text, derived_key, {
    iv: iv,
    mode: crypto.mode.CBC,
  }).toString();
  return randomInt16 + payload;
}

bot.command('start', async (ctx) => {
  let userId = ctx.update.message.from.id;
  let encrypted = '+';
  do {
    encrypted = encrypt(userId.toString());
  } while (encrypted.includes('+'));
  if (userId && encrypted) {
    await ctx.replyWithPhoto(new InputFile('tg-cover.png'), {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Start Layer X',
              web_app: {
                url: web_link + '?tgId=' + encodeURIComponent(encrypted),
              },
            },
          ],
          [{ text: '🫂 FOLLOW X', url: 'https://x.com/TheLayerX' }],
        ],
      },
      caption:
        'Explore the possibilities with Layer X, The Only Layer 2. Join Initial X Offers for exclusive fundraising, transform any post on X into a unique NFT, or challenge your friends in an epic card game. The choice is yours!',
    });

    ctx.setChatMenuButton({
      text: 'Start Layer X',
      type: 'web_app',
      web_app: {
        url: web_link + '?tgId=' + encodeURIComponent(encrypted),
      },
    });
  } else {
    ctx.reply('Failed to encrypt. Please type start again');
  }
  // sets Web App as the menu button for current chat
});

bot.launch();
