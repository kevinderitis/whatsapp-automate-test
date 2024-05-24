const { Client } = require('whatsapp-web.js');
const express = require('express');
const qrcode = require('qrcode');
const app = express();
const path = require('path'); 
const port = process.env.PORT || 3000;
const ejs = require('ejs');
app.set('view engine', 'ejs');

let qrData;

app.get('/qr', async (req, res) => {
    const data = qrData;
  
    try {
    //   const qrText = await qrcode.toString(data);
        const qrText = data;
      res.render('qr-code', { qrText });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error generating QR code'); // Handle errors
    }
  });

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


const client = new Client({
    webVersionCache: {
        type: "remote",
        remotePath:
            "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
    },
});

client.on('qr', (qr) => {
    qrData = qr;
    console.log(`Este es la data de qr: ${qrData}`)
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
    msg.send('Hola! bienvenuti papein. Te paso el contacto para que hables.')
});

client.initialize();
