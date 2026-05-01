const schedule = require('node-schedule');
const moment = require('moment-timezone');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

module.exports.config = {
    name: 'autosent',
    version: '16.0.0',
    hasPermssion: 0,
    credits: 'MOSTAKIM',
    description: 'Auto Time Update Bot (BD Time)',
    commandCategory: 'group messenger',
    usages: '[]',
    cooldowns: 3
};

// 👉 target threads (null = all groups)
const TARGET_THREADS = null;

// 👉 optional image URL fallback
const IMAGE_URL = "https://i.ibb.co/your-image.jpg";

// 👉 local image path
const LOCAL_IMAGE = path.join(__dirname, '../../cache/time.jpg');

function getMessage() {
    const now = moment().tz('Asia/Dhaka');

    return `
✦••••••••••••••••••••••••••••••✦
        ⏰  𝗧𝗜𝗠𝗘 𝗨𝗣𝗗𝗔𝗧𝗘
✦••••••••••••••••••••••••••••••✦

✰ 🕒 𝗧𝗜𝗠𝗘 ➪ ${now.format('hh:mm A')}
✰ 🔎 𝗗𝗔𝗧𝗘 ➪ ${now.format('DD MMMM YYYY')}
✰ 📣 𝗗𝗔𝗬 ➪ ${now.format('dddd')}

✦••••••••••••••••••••••••••••••✦
      🤖 𝐌𝐎𝐒𝐓𝐀𝐊𝐈𝐌 𝐆𝐎𝐀𝐓 𝐁𝐎𝐓 !
✦••••••••••••••••••••••••••••••✦
`;
}

// 👉 smart image system (local → url → none)
async function getImage() {
    try {
        if (fs.existsSync(LOCAL_IMAGE)) {
            console.log('📁 Using local image');
            return fs.createReadStream(LOCAL_IMAGE);
        }

        if (IMAGE_URL) {
            console.log('🌐 Using image URL');
            const res = await axios({
                url: IMAGE_URL,
                method: 'GET',
                responseType: 'stream'
            });
            return res.data;
        }

        return null;

    } catch (err) {
        console.log('❌ Image error:', err);
        return null;
    }
}

module.exports.onLoad = ({ api }) => {
    console.log(chalk.green('==== AUTO TIME BOT LOADED ====' ));

    const scheduleSend = async () => {
        const message = getMessage();
        const image = await getImage();

        const threads = TARGET_THREADS || global.data?.allThreadID;
        if (!threads) return;

        threads.forEach(threadID => {
            api.sendMessage({
                body: message,
                attachment: image || undefined
            }, threadID);
        });
    };

    for (let hour = 0; hour < 24; hour++) {

        const rule = new schedule.RecurrenceRule();
        rule.tz = 'Asia/Dhaka';
        rule.hour = hour;
        rule.minute = [0, 30]; // ⏰ 00 & 30

        schedule.scheduleJob(rule, () => {
            scheduleSend();
            console.log(`✅ Sent at ${hour}:00 / ${hour}:30`);
        });
    }
};

module.exports.run = () => {};
