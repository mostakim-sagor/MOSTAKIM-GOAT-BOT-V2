module.exports = {
  config: {
    name: "owner",
    version: "2.5.0",
    author: "MOSTAKIM",
    countDown: 5,
    role: 0,
    category: "info"
  },

  onStart: async function ({ api, event, usersData }) {
    try {
      const threadID = event.threadID;

      const ownerUID =
        global.GoatBot?.config?.adminBot?.[0] ||
        global.GoatBot?.config?.admin?.[0];

      if (!ownerUID) {
        return api.sendMessage("❌ Owner not found!", threadID);
      }

      let ownerName = "Owner";

      try {
        const data = await usersData.get(ownerUID);
        ownerName = data?.name || "Owner";
      } catch (e) {}

      const botName =
        global.GoatBot?.config?.nickNameBot ||
        global.GoatBot?.config?.BOTNAME ||
        "Goat Bot";

      const botVersion =
        global.GoatBot?.version ||
        require(process.cwd() + "/package.json")?.version ||
        "Unknown";

      const messageText =
`👤 𝐎𝐰𝐧𝐞𝐫 𝐈𝐧𝐟𝐨 !
━━━━━━━━━━━━━━━
Name: ${ownerName}
Username: @MD.MOSTAKIM.ISLAM.SAGOR
Location: Dhaka , Bangladesh

📞 Contact
Messenger: https://m.me/${ownerUID}

🤖 𝐁𝐨𝐭 𝐈𝐧𝐟𝐨 !
━━━━━━━━━━━━━━━
Bot Name: ${botName}
Version: ${botVersion}

💭 "Building smart bots for smarter chats."`;

      const leftID = ownerUID;

      // 🔥 SHARECONTACT + FALLBACK + MENTION SYSTEM
      return api.shareContact(messageText, leftID, threadID, (err, info) => {
        if (err) {
          console.log("shareContact error:", err);

          // fallback with mention
          return api.sendMessage(
            {
              body: messageText,
              mentions: [
                {
                  tag: ownerName,
                  id: ownerUID
                }
              ]
            },
            threadID
          );
        }

        setTimeout(() => {
          api.unsendMessage(info.messageID);
        }, 20000);
      });

    } catch (err) {
      console.log(err);
      return api.sendMessage("❌ Error loading owner info!", event.threadID);
    }
  }
};
