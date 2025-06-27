const { PREFIX } = require(`${BASE_DIR}/config`);
const { errorLog } = require(`${BASE_DIR}/utils/logger`);

module.exports = {
  name: "open",
  description: "Membuka grup.",
  commands: ["open", "open-group"],
  usage: `${PREFIX}open`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ socket, remoteJid, sendSuccessReply, sendErrorReply }) => {
    try {
      await socket.groupSettingUpdate(remoteJid, "not_announcement");
      await sendSuccessReply("Grup berhasil dibuka!");
    } catch (error) {
      await sendErrorReply(
        "Untuk membuka grup, saya perlu menjadi admin grup!"
      );
      errorLog(
        `Terjadi error saat membuka grup! Penyebab: ${JSON.stringify(
          error,
          null,
          2
        )}`
      );
    }
  },
};
