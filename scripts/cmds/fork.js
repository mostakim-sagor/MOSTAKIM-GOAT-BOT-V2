module.exports = {
  config: {
    name: "fork",
    aliases: ["repo", "source"],
    version: "1.0",
    author: "MOSTAKIM",
    countDown: 3,
    role: 0,
    longDescription: "Returns the link to the official, updated fork of the bot's repository.",
    category: "system",
    guide: { en: "{pn}" }
  },

  onStart: async function({ message }) {
    const text = "✓ | Here is the updated repository:\n\nhttps://github.com/mostakim-sagor/M0STAKIM-GOAT-BOT-V2.git\n\n" +
                 "Changes:\n1. No Google Credentials needed\n2. Enhanced overall performance\n3. [ Automatic log out issues Solved ]\n4. Working on all groups\n5. Id Ban Issue solved 90% and running for a long time\n\n" +
                 "Keep supporting^_^";
    
    message.reply(text);
  }
};
