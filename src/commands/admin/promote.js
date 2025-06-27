const { PREFIX } = require(`${BASE_DIR}/config`);
const { isGroup } = require(`${BASE_DIR}/utils`);
const { errorLog } = require(`${BASE_DIR}/utils/logger`);

module.exports = {
  name: "promote",
  description: "Mempromosikan pengguna menjadi admin grup",
  commands: ["promote", "add-adm"],
  usage: `${PREFIX}promote @pengguna`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    args,
    remoteJid,
    socket,
    sendWarningReply,
    sendSuccessReply,
    sendErrorReply,
  }) => {
    if (!isGroup(remoteJid)) {
      return sendWarningReply("Perintah ini hanya dapat digunakan di grup!");
    }

    if (!args.length || !args[0]) {
      return sendWarningReply("Silakan tag pengguna untuk dipromosikan.");
    }

    const userId = args[0].replace("@", "") + "@s.whatsapp.net";

    try {
      await socket.groupParticipantsUpdate(remoteJid, [userId], "promote");
      await sendSuccessReply("Pengguna berhasil dipromosikan!");
    } catch (error) {
      errorLog(`Error saat mempromosikan pengguna: ${error.message}`);
      await sendErrorReply(
        "Terjadi error saat mencoba mempromosikan pengguna. Saya perlu menjadi admin grup untuk mempromosikan pengguna lain!"
      );
    }
  },
};
