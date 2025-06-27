const { PREFIX } = require(`${BASE_DIR}/config`);
const { errorLog } = require(`${BASE_DIR}/utils/logger`);

module.exports = {
  name: "close",
  description: "Menutup grup.",
  commands: ["close", "close-group"],
  usage: `${PREFIX}close`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ socket, remoteJid, sendSuccessReply, sendErrorReply }) => {
    try {
      await socket.groupSettingUpdate(remoteJid, "announcement");
      await sendSuccessReply("Grup berhasil ditutup!");
    } catch (error) {
      await sendErrorReply(
        "Untuk menutup grup, saya perlu menjadi admin grup!"
      );
      errorLog(
        `Terjadi error saat menutup grup! Penyebab: ${JSON.stringify(
          error,
          null,
          2
        )}`
      );
    }
  },
};
