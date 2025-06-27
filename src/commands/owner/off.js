const { PREFIX } = require(`${BASE_DIR}/config`);
const { deactivateGroup } = require(`${BASE_DIR}/utils/database`);

module.exports = {
  name: "off",
  description: "Menonaktifkan bot di grup",
  commands: ["off"],
  usage: `${PREFIX}off`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendSuccessReply, remoteJid, isGroup }) => {
    if (!isGroup) {
      throw new WarningError("Perintah ini harus digunakan di dalam grup.");
    }

    deactivateGroup(remoteJid);

    await sendSuccessReply("Bot dinonaktifkan di grup!");
  },
};
