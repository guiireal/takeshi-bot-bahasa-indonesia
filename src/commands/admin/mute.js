/**
 * Dikembangkan oleh: Mkg
 * Direfaktor oleh: Dev Gui
 *
 * @author Dev Gui
 */
const { toUserJid, onlyNumbers } = require(`${BASE_DIR}/utils`);
const {
  checkIfMemberIsMuted,
  muteMember,
} = require(`${BASE_DIR}/utils/database`);
const {
  PREFIX,
  BOT_NUMBER,
  OWNER_NUMBER,
  OWNER_LID,
} = require(`${BASE_DIR}/config`);

const { DangerError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "mute",
  description:
    "Membungkam pengguna di grup (menghapus pesan pengguna secara otomatis).",
  commands: ["mute", "mutar"],
  usage: `${PREFIX}mute @pengguna atau (balas pesan pengguna yang ingin dibungkam)`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    args,
    remoteJid,
    replyJid,
    userJid,
    sendErrorReply,
    sendSuccessReply,
    getGroupMetadata,
    socket,
    isGroupWithLid,
    isGroup,
  }) => {
    if (!isGroup) {
      throw new DangerError("Perintah ini hanya dapat digunakan di grup.");
    }

    if (!args.length && !replyJid) {
      throw new DangerError(
        `Anda perlu menyebutkan pengguna atau membalas pesan pengguna yang ingin dibungkam.\n\nContoh: ${PREFIX}mute @seseorang`
      );
    }

    const targetUserNumber = args.length
      ? onlyNumbers(args[0])
      : isGroupWithLid
      ? replyJid
      : onlyNumbers(replyJid);

    if ([OWNER_NUMBER, OWNER_LID].includes(targetUserNumber)) {
      throw new DangerError("Anda tidak dapat membungkam pemilik bot!");
    }

    const targetUserJid = isGroupWithLid
      ? targetUserNumber
      : toUserJid(targetUserNumber);

    if (targetUserJid === toUserJid(BOT_NUMBER)) {
      throw new DangerError("Anda tidak dapat membungkam bot.");
    }

    const [result] =
      replyJid && isGroupWithLid
        ? [{ jid: targetUserJid, lid: targetUserJid }]
        : await socket.onWhatsApp(targetUserNumber);

    if (result.jid === userJid) {
      throw new DangerError("Anda tidak dapat membungkam diri sendiri!");
    }

    const groupMetadata = await getGroupMetadata();

    const isUserInGroup = groupMetadata.participants.some(
      (participant) => participant.id === targetUserJid
    );

    if (!isUserInGroup) {
      return sendErrorReply(
        `Pengguna @${targetUserNumber} tidak ada di grup ini.`,
        [targetUserJid]
      );
    }

    const isTargetAdmin = groupMetadata.participants.some(
      (participant) => participant.id === targetUserJid && participant.admin
    );

    if (isTargetAdmin) {
      throw new DangerError("Anda tidak dapat membungkam admin.");
    }

    if (checkIfMemberIsMuted(remoteJid, targetUserJid)) {
      return sendErrorReply(
        `Pengguna @${targetUserNumber} sudah dibungkam di grup ini.`,
        [targetUserJid]
      );
    }

    muteMember(remoteJid, targetUserJid);

    await sendSuccessReply(
      `@${targetUserNumber} berhasil dibungkam di grup ini!`,
      [targetUserJid]
    );
  },
};
