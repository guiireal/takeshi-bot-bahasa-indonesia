const { errorLog } = require(`${BASE_DIR}/utils/logger`);
const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const { WarningError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "set-name",
  description: "Mengubah nama grup dan menyimpan nama lama",
  commands: ["set-name", "set-group-name", "mudar-nome-grupo", "nome-grupo"],
  usage: `${PREFIX}set-name nama grup baru`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    fullArgs,
    remoteJid,
    socket,
    sendErrorReply,
    sendSuccessReply,
    sendWaitReply,
    isGroup,
  }) => {
    if (!isGroup) {
      throw new WarningError("Perintah ini hanya dapat digunakan di grup.");
    }

    if (!fullArgs) {
      throw new InvalidParameterError(
        "Anda perlu memberikan nama baru untuk grup!"
      );
    }

    const minLength = 3;
    const maxLength = 40;

    if (fullArgs.length < minLength || fullArgs.length > maxLength) {
      throw new InvalidParameterError(
        `Nama grup harus antara ${minLength} dan ${maxLength} karakter!`
      );
    }

    try {
      await sendWaitReply("Mengubah nama grup...");

      const groupMetadata = await socket.groupMetadata(remoteJid);
      const oldName = groupMetadata.subject;

      await socket.groupUpdateSubject(remoteJid, fullArgs);

      await sendSuccessReply(
        `Nama grup berhasil diubah!\n\n*Lama*: ${oldName}\n\n*Baru*: ${fullArgs}`
      );
    } catch (error) {
      errorLog("Error saat mengubah nama grup:", error);
      await sendErrorReply(
        "Gagal mengubah nama grup. Periksa apakah saya memiliki izin admin."
      );
    }
  },
};
