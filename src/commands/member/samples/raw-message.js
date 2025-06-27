const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "raw-message",
  description: "Mendapatkan data mentah pesan",
  commands: ["raw-message", "raw"],
  usage: `${PREFIX}raw-message`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ webMessage, sendReply }) => {
    await sendReply(JSON.stringify(webMessage, null, 2));
  },
};
