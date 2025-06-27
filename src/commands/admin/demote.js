const { PREFIX } = require(`${BASE_DIR}/config`);
const { isGroup } = require(`${BASE_DIR}/utils`);
const { errorLog } = require(`${BASE_DIR}/utils/logger`);

module.exports = {
  name: "demote",
  description: "Menurunkan admin menjadi anggota biasa",
  commands: ["demote"],
  usage: `${PREFIX}demote @pengguna`,
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
      return sendWarningReply("Silakan tag admin untuk diturunkan.");
    }

    const userId = args[0].replace("@", "") + "@s.whatsapp.net";

    try {
      await socket.groupParticipantsUpdate(remoteJid, [userId], "demote");
      await sendSuccessReply("Pengguna berhasil diturunkan!");
    } catch (error) {
      errorLog(`Error saat menurunkan admin: ${error.message}`);
      await sendErrorReply(
        "Terjadi error saat mencoba menurunkan pengguna. Saya perlu menjadi admin grup untuk menurunkan admin lain!"
      );
    }
  },
};
