const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')	
const googleTTS = require("google-tts-api");
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");



cmd({
            pattern: "tts",
            react: "💭",
            desc: "q to speech.",
            category: "convertp",
            filename: __filename,
            use: '<Hii,this is Secktor>',
       },
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname,  isSachintha, isSavi, isSadas, isMani, isMe,isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
if(!isOwner && !isSachintha && !isSavi && !isSadas && !isMani && !isMe)return;
    try{
        async(mek, m, q) => {
            if (!q) return m.reply('Please give me Sentence to change into audio.')
            let qtts = q
            const ttsurl = googleTTS.getAudioUrl(qtts, {
                lang: "en",
                slow: false,
                host: "https://translate.google.com",
            });
            return mek.sendMessage(m.chat, {
                audio: {
                    url: ttsurl,
                },
                mimetype: "audio/mpeg",
                fileName: `ttsmmek.m4a`,
            }, {
                quoted: m,
            });
        }

                
} catch (e) {
reply('*Error !!*')
l(e)
}
})

/*

cmd({
    pattern: "attp",
    react: "✨",
    alias: ["texttogif"],
    desc: "convert text to gift",
    category: "convert",
    use: '.attp HI',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return await reply()
let bufff = await getBuffer("https://vihangayt.me/maker/text2gif?q=" + q)
await conn.sendMessage(from, {sticker: await videoToWebp(bufff)}, {quoted: mek })
} catch (e) {
reply('*Error !!*')
l(e)
}
})

            
cmd({
    pattern: "toptt",
    react: "🔊",
    alias: ["toaudio"],
    desc: "convert to audio",
    category: "convert",
    use: '.toptt <Reply to video>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    let isquotedvid = m.quoted ? (m.quoted.type === 'videoMessage') : m ? (m.type === 'videoMessage') : false
    if(!isquotedvid) return await reply()
    let media = m.quoted ? await m.quoted.download() : await m.download()
    let auddio = await toPTT(media, 'mp4')
    let senda =  await conn.sendMessage(m.chat, {audio: auddio.options, mimetype:'audio/mpeg'}, {quoted:m})
    await conn.sendMessage(from, { react: { text: '🎼', key: senda.key }})
} catch (e) {
reply('*Error !!*')
l(e)
}
})       


cmd({
    pattern: "sticker",
    react: "🔮",
    alias: ["s","stic"],
    desc: "Convert to sticker",
    category: "convert",
    use: '.sticker <Reply to image>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const isQuotedViewOnce = m.quoted ? (m.quoted.type === 'viewOnceMessage') : false
    const isQuotedImage = m.quoted ? ((m.quoted.type === 'imageMessage') || (isQuotedViewOnce ? (m.quoted.msg.type === 'imageMessage') : false)) : false
    const isQuotedVideo = m.quoted ? ((m.quoted.type === 'videoMessage') || (isQuotedViewOnce ? (m.quoted.msg.type === 'videoMessage') : false)) : false
    const isQuotedSticker = m.quoted ? (m.quoted.type === 'stickerMessage') : false
     if ((m.type === 'imageMessage') || isQuotedImage) {
      var nameJpg = getRandom('')
      isQuotedImage ? await m.quoted.download(nameJpg) : await m.download(nameJpg)
    let sticker = new Sticker(nameJpg + '.jpg', {
      pack: pushname, // The pack name
      author: '', // The author name
      type: q.includes("--crop" || '-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
      categories: ["🤩", "🎉"], // The sticker category
      id: "12345", // The sticker id
      quality: 75, // The quality of the output file
      background: "transparent", // The sticker background color (only for full stickers)
  });
  const buffer = await sticker.toBuffer();
  return conn.sendMessage(from, {sticker: buffer}, {quoted: mek })
}  else if ( isQuotedSticker ) { 

    var nameWebp = getRandom('')
    await m.quoted.download(nameWebp)
  let sticker = new Sticker(nameWebp + '.webp', {
    pack: pushname, // The pack name
    author: '', // The author name
    type: q.includes("--crop" || '-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
    categories: ["🤩", "🎉"], // The sticker category
    id: "12345", // The sticker id
    quality: 75, // The quality of the output file
    background: "transparent", // The sticker background color (only for full stickers)
});
const buffer = await sticker.toBuffer();
return conn.sendMessage(from, {sticker: buffer}, {quoted: mek })
}else return await  reply(imgmsg)
} catch (e) {
reply('*Error !!*')
l(e)
}
})

            
