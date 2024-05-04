const { cmd } = require('../command')
const googleTTS = require("google-tts-api");


cmd({
            pattern: "tts",
            react: "💭",
            desc: "q to speech.",
            category: "downloader",
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
