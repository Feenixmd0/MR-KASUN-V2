const fs = require('fs')
const P = require('pino')
const path = require('path');
const config = require('./config')
const qrcode = require('qrcode-terminal')
const util = require('util')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('./lib/functions')
const { sms,downloadMediaMessage } = require('./lib/msg')
const axios = require('axios');
const cheerio = require('cheerio');
const fetch = require("node-fetch");
const {
	default: makeWASocket,
	jidNormalizedUser,
	proto,
	Browsers,
	getAggregateVotesInPollMessage,
	getKeyAuthor,
	decryptPollVote,
	normalizeMessageContent, BufferJSON,generateLinkPreviewIfRequired, WA_DEFAULT_EPHEMERAL, generateWAMessageContent, makeCacheableSignalKeyStore, generateWAMessage, AnyMessageContent, prepareWAMessageMedia, areJidsSameUser, getContentType, downloadContentFromMessage, DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion, MessageRetryMap, generateForwardMessageContent, generateWAMessageFromContent, generateMessageID, makeInMemoryStore, jidDecode
} = require("@whiskeysockets/baileys");

const { File } = require('megajs')
const prefix = config.PREFIX;
const ownerNumber = config.OWNER;
const l = console.log
const addresses = config.ADDRESSES;
const addressArray = addresses.split(',');
function genMsgId() {
  const lt = 'sachibotprmd';
  const prefix = "3EB";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomText = prefix;

  for (let i = prefix.length; i < 22; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomText += characters.charAt(randomIndex);
  }

  return randomText;
}
  //=========================================
let previousLinkId = '1';
//===================SESSION============================
async function MakeSession() {
    try {
        console.log("WRITING SESSION...");
        const {
          data
        } = await axios(`https://paste.c-net.org/${config.SESSION_ID.split('DARKSHAN=')[1]}`);
        await fs.writeFileSync("./auth_info_baileys/creds.json", JSON.stringify(data));
        console.log("SESSION CONNECTED SUCCESSFULLY✅");
      } catch (err) {
        console.log(err);
      }
}
MakeSession();
// <<==========PORTS===========>>
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
//====================================
async function connectToWA() {
  console.log("Connecting bot...");
  const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/auth_info_baileys/')
  var { version } = await fetchLatestBaileysVersion()
  const latestWebVersion = () => {
          let version
          try {
              let a = fetchJson('https://web.whatsapp.com/check-update?version=1&platform=web')
              version = [a.currentVersion.replace(/[.]/g, ', ')]
          } catch {
              version = [2, 2204, 13]
          }
          return version
   }
  const store = makeInMemoryStore({
          logger: P({ level: "silent", stream: "store" }),
      });
  const NodeCache = require("node-cache")
  const msgRetryCounterCache = new NodeCache()
  
      const conn = makeWASocket({
          logger: P({ level: 'silent' }),
          printQRInTerminal: false,     
       auth: {
           creds: state.creds,
           keys: makeCacheableSignalKeyStore(state.keys, P({ level: "fatal" }).child({ level: "fatal" })),
        },
        browser: Browsers.macOS("Safari"),
        getMessage: async (key) => {
           let jid = jidNormalizedUser(key.remoteJid)
           let msg = await store.loadMessage(jid, key.id)
  
           return msg?.message || ""
        },
        msgRetryCounterCache,
        defaultQueryTimeoutMs: undefined, 
        syncFullHistory: false,
        latestWebVersion,
     })
  
          store.bind(conn.ev)
  setInterval(() => {
      store.writeToFile(__dirname+"/store.json");
    }, 3000);
  
conn.ev.on('connection.update', (update) => {
const { connection, lastDisconnect } = update
if (connection === 'close') {
if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
connectToWA()
}
} else if (connection === 'open') {

console.log('Installing plugins 🔌... ')
const path = require('path');
fs.readdirSync("./plugins/").forEach((plugin) => {
if (path.extname(plugin).toLowerCase() == ".js") {
require("./plugins/" + plugin);
}
});
console.log('Plugins installed ✅')
console.log('Bot connected ✅')
conn.sendMessage(ownerNumber + "@s.whatsapp.net", { text: `┏┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┓

╟ ♤ 𝚃𝙷𝙰𝙽𝙺𝚂 𝙵𝙾𝚁 𝚄𝚂𝙴𝙸𝙽𝙶 𝙳𝙰𝚁𝙺 𝚂𝙷𝙰𝙽 𝙼𝙳 

╟ ♤ 𝙳𝙴𝚅𝙰𝙻𝙾𝙿𝙴𝚁 𝙱𝚈 𝙺𝚄𝚂𝙷𝙰𝙽 𝚂𝙴𝚆𝙼𝙸𝙽𝙰 

╟ ♤ 𝙼𝙰𝙸𝙽 𝚃𝙾𝚄𝚃𝚄𝙱𝙴 𝙲𝙷𝙰𝙽𝙽𝙴𝙻
https://youtube.com/@darkshanyt1

╟ ♤ 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿 𝙲𝙷𝙰𝙽𝙽𝙴𝙻
https://whatsapp.com/channel/0029VaFLAgi90x2oD70Hwq1z

◎┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅◎
                         𝙳𝙰𝚁𝙺 𝚂𝙷𝙰𝙽 𝙼𝙳
◎┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅◎


┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┛` } ,{messageId:genMsgId()} )    
sleep(5000)

 
}
})
conn.ev.on('creds.update', saveCreds)

conn.ev.on('messages.upsert', async(mek) => {
try {
    
	      
mek = mek.messages[0]
if (!mek.message) return	
mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
if (mek.key && mek.key.remoteJid === 'status@broadcast') return
const m = sms(conn, mek)
const type = getContentType(mek.message)
const content = JSON.stringify(mek.message)
const from = mek.key.remoteJid
const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
const body = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : ''
const isCmd = body.startsWith(prefix)
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
const args = body.trim().split(/ +/).slice(1)
const q = args.join(' ')
const isGroup = from.endsWith('@g.us')
const sender = mek.key.fromMe ? (conn.user.id.split(':')[0]+'@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
const senderNumber = sender.split('@')[0]
const botNumber = conn.user.id.split(':')[0]
const pushname = mek.pushName || 'No Name'
const isMe = botNumber?.includes(senderNumber)	
const isOwner = ownerNumber?.includes(senderNumber) 
const botNumber2 = await jidNormalizedUser(conn.user.id);
const groupMetadata = isGroup ? await conn.groupMetadata(from).catch(e => {}) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupAdmins = isGroup ? await getGroupAdmins(participants) : ''
const isBotAdmins = isGroup ? groupAdmins?.includes(botNumber2) : false
const isAdmins = isGroup ? groupAdmins?.includes(sender) : false
const isreaction = m.message.reactionMessage ? true : false
const reply = (teks) => {
conn.sendMessage(from, { text: teks }, { quoted: mek ,messageId:genMsgId()  })
}
conn.sendFileUrl = async(jid, url, caption, quoted, options = {}) => {
  let mime = '';
  let res = await axios.head(url)
  mime = res.headers['content-type']
  if (mime.split("/")[1] === "gif") {
      return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options }, { quoted: quoted,   ...options })
  }
  let type = mime.split("/")[0] + "Message"
  if (mime === "application/pdf") {
      return conn.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options }, { quoted: quoted,  ...options })
  }
  if (mime.split("/")[0] === "image") {
      return conn.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options }, { quoted: quoted ,  ...options })
  }
  if (mime.split("/")[0] === "video") {
      return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options }, { quoted: quoted ,  ...options })
  }
  if (mime.split("/")[0] === "audio") {
      return conn.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options }, { quoted: quoted,  ...options })
  }
}
 if (config.ALWAYS_ONLINE === 'false') {
 await conn.sendPresenceUpdate('unavailable');
 }
 if (config.WAPRESENCE === 'composing') {
 await conn.sendPresenceUpdate('composing', from);
 }
 
if (!isMe && !isOwner && !isGroup && config.ONLY_GROUP == 'true') return 
if (!isMe && !isOwner && config.ONLY_ME == 'true') return 
//==================================plugin map================================
const events = require('./command')
const cmdName = isCmd ? body.slice(1).trim().split(" ")[0].toLowerCase() : false;
if (isCmd) {
const cmd = events.commands.find((cmd) => cmd.pattern === (cmdName)) || events.commands.find((cmd) => cmd.alias && cmd.alias?.includes(cmdName))
if (cmd) {
if (cmd.react) conn.sendMessage(from, { react: { text: cmd.react, key: mek.key }})

try {
cmd.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply});
} catch (e) {
console.error("[PLUGIN ERROR] ", e);
}
}
}
events.commands.map(async(command) => {
if (body && command.on === "body") {
command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
} else if (mek.q && command.on === "text") {
command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
} else if (
(command.on === "image" || command.on === "photo") &&
mek.type === "imageMessage"
) {
command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
} else if (
command.on === "sticker" &&
mek.type === "stickerMessage"
) {
command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
}});
//====================================================================
switch (command) {
case 'jid':
reply(from)
break

default:				
if ((isOwner || isMe) && body.startsWith('>')) {
let bodyy = body.split('>')[1]
let code2 = bodyy.replace("°", ".toString()");
try {
let resultTest = await eval(code2);
if (typeof resultTest === "object") {
reply(util.format(resultTest));
} else {
reply(util.format(resultTest));
}
} catch (err) {
reply(util.format(err));
}}}
} catch (e) {
const isError = String(e)
console.log(isError)}
})
}
app.get("/", (req, res) => {
res.send("📟 DARK-SHAN Working successfully!");
});
app.listen(port, () => console.log(`DARK-SHAN Server listening on port http://localhost:${port}`));
setTimeout(() => {
connectToWA()
}, 3000);
