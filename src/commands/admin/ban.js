const { OWNER_NUMBER } = require("../../config");

const { PREFIX, BOT_NUMBER } = require(`${BASE_DIR}/config`);
const { DangerError, InvalidParameterError } = require(`${BASE_DIR}/errors`);
const { toUserJid, onlyNumbers } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "ban",
  description: "Menghapus anggota dari grup",
  commands: ["ban", "kick"],
  usage: `${PREFIX}ban @tag_anggota 
  
atau 

${PREFIX}ban (menyebutkan pesan)`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    args,
    isReply,
    socket,
    remoteJid,
    replyJid,
    sendReply,
    userJid,
    sendSuccessReact,
  }) => {
    if (!args.length && !isReply) {
      throw new InvalidParameterError(
        "Anda perlu menyebutkan atau menandai anggota!"
      );
    }

    const memberToRemoveJid = isReply ? replyJid : toUserJid(args[0]);
    const memberToRemoveNumber = onlyNumbers(memberToRemoveJid);

    if (memberToRemoveNumber.length < 7 || memberToRemoveNumber.length > 15) {
      throw new InvalidParameterError("Nomor tidak valid!");
    }

    if (memberToRemoveJid === userJid) {
      throw new DangerError("Anda tidak bisa menghapus diri sendiri!");
    }

    if (memberToRemoveNumber === OWNER_NUMBER) {
      throw new DangerError("Anda tidak bisa menghapus pemilik bot!");
    }

    const botJid = toUserJid(BOT_NUMBER);

    if (memberToRemoveJid === botJid) {
      throw new DangerError("Anda tidak bisa menghapus saya!");
    }

    await socket.groupParticipantsUpdate(
      remoteJid,
      [memberToRemoveJid],
      "remove"
    );

    await sendSuccessReact();

    await sendReply("Anggota berhasil dihapus!");
  },
};
