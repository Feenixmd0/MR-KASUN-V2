const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const fs = require('fs')
const axios = require('axios')




cmd({
    pattern: "tiktok",
    alias: ["ttdl"],
    react: '🏷️',
    desc: "To download tiktok videos",
    category: "download",
    use: '.tiktok <Tiktok link>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if (!q) reply ('Enter Query Link!');

    let anu = await fetchJson(`https://vajira-apis-803339515192.herokuapp.com/api/dowloader/tikok?url=${encodeURIComponent(q)}`);

    console.log('TikTok API Response:', anu);

    if (anu.status === 200 && anu.message === 'success' && anu.result) {
      const videoUrl = anu.result;

      const response = await axios.get(videoUrl, { responseType: 'arraybuffer' });
      const videoBuffer = Buffer.from(response.data);

      // Save the video to a temporary file
      const randomName = `temp_${Math.floor(Math.random() * 10000)}.mp4`;
      fs.writeFileSync(`./${randomName}`, videoBuffer);

      // Send the video using vajira.sendMessage with the saved video
      await conn.sendMessage(from, { video: fs.readFileSync(`./${randomName}`), mimetype: 'video/mp4', caption: 'Downloaded by vajira botwa' }, { quoted: mek });

      // Delete the temporary file
      fs.unlinkSync(`./${randomName}`);
    } else {
      console.log ('Error: Unable to fetch TikTok video. Check the console logs for more details.');
    }
  
await conn.sendMessage(from, { react: { text: '📥', key: mek.key }})
} catch (e) {
    console.error(e);
    reply('An error occurred while processing your request.')
l(e)
}
})	
