const { PREFIX } = require(`${BASE_DIR}/config`);
const { activateGroup } = require(`${BASE_DIR}/utils/database`);

module.exports = {
  name: "on",
  description: "Mengaktifkan bot di grup",
  commands: ["on"],
  usage: `${PREFIX}on`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendSuccessReply, remoteJid, isGroup }) => {
    if (!isGroup) {
      throw new WarningError("Perintah ini harus digunakan di dalam grup.");
    }

    activateGroup(remoteJid);

    await sendSuccessReply("Bot diaktifkan di grup!");
  },
};
