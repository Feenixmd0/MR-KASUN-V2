const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')


cmd({
    pattern: "ios",
    alias: ["apple","applenews"],
    react: "🍎",
    desc: "tmsg",
    category: "search",
    use: '.ios',
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try{
const data = await fetchJson(`https://api.maher-zubair.tech/details/ios`);   	
let info = `👨‍💻 DARK SHAN ＩＯＳ ＮＥＷＳ 👨‍💻

*🔖 Title:* ${data.result.title}
*⛓️ Link:* ${data.result.link}
*📚 Description:* ${data.result.desc}`
return await conn.sendMessage(from, { image: { url: data.result.images} , caption: info } , { quoted: mek })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }})
} catch (e) {
l(e)
}
})
