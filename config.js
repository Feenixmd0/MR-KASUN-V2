const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID === undefined ? '' : process.env.SESSION_ID,
ONLY_GROUP: process.env.ONLY_GROUP === undefined ? 'false' : process.env.ONLY_GROUP,
ONLY_ME: process.env.ONLY_ME === undefined ? 'true' : process.env.ONLY_ME,
ADDRESSES: process.env.ADDRESSES === undefined ? '' : process.env.ADDRESSES,
ALIVE: process.env.ALIVE === undefined ? `Hello im alive now !!` : process.env.ALIVE,
OWNER: process.env.OWNER === undefined ? `94725881990` : process.env.OWNER,
PREFIX: process.env.PREFIX === undefined ? '@' : process.env.PREFIX,
FOOTER: process.env.FOOTER=== undefined ? '‌ꜱᴀᴄʜɪʙᴏᴛ': process.env.FOOTER,
ALWAYS_ONLINE: process.env.ALWAYS_ONLINE === undefined ? false : process.env.ALWAYS_ONLINE,
AUTO_READ_STATUS: process.env.AUTO_READ_STATUS === undefined ? false : process.env.ALWAYS_ONLINE,
WAPRESENCE:process.env.WAPRESENCE === undefined ? false : process.env.WAPRESENCE, // 'composing' (typing) | 'recording' (recording) | 'paused'
LOGO: process.env.LOGO === undefined ? `https://telegra.ph/file/98b9cdf149a52bef8f4d5.jpg` : process.env.LOGO
};
