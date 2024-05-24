const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    webVersionCache: {
      type: "remote",
      remotePath:
        "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
    },
  });

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true }, (err, url) => {
    if (err) {
      console.error('Error generating QR code:', err);
    } else {
      console.log('QR RECEIVED, scan this code with your phone:');
      console.log(url);
    }
  });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

client.initialize();
