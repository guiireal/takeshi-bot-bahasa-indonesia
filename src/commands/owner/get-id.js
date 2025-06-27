const { PREFIX } = require(`${BASE_DIR}/config`);
const { WarningError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "get-id",
  description: "Mengembalikan ID lengkap grup dalam format JID.",
  commands: ["get-id", "get-group-id", "id-get", "id-group"],
  usage: `${PREFIX}get-id`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ remoteJid, sendSuccessReply, isGroup }) => {
    if (!isGroup) {
      throw new WarningError("Perintah ini harus digunakan di dalam grup.");
    }

    await sendSuccessReply(`*ID Grup*: ${remoteJid}`);
  },
};
