/**
 * Dikembangkan oleh: Mkg
 * Direfaktor oleh: Dev Gui
 *
 * @author Dev Gui
 */
const { toUserJid, onlyNumbers } = require(`${BASE_DIR}/utils`);
const {
  checkIfMemberIsMuted,
  unmuteMember,
} = require(`${BASE_DIR}/utils/database`);
const { PREFIX } = require(`${BASE_DIR}/config`);

const { DangerError, WarningError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "unmute",
  description: "Membatalkan pembungkaman anggota grup",
  commands: ["unmute"],
  usage: `${PREFIX}unmute @pengguna`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    remoteJid,
    sendSuccessReply,
    args,
    isGroup,
    isGroupWithLid,
    socket,
  }) => {
    if (!isGroup) {
      throw new DangerError("Perintah ini hanya dapat digunakan di grup.");
    }

    if (!args.length) {
      throw new DangerError(
        `Anda perlu menyebutkan pengguna untuk dibatalkan pembungkamannya.\n\nContoh: ${PREFIX}unmute @pengguna`
      );
    }

    const targetUserNumber = onlyNumbers(args[0]);
    let targetUserJid = toUserJid(targetUserNumber);

    if (isGroupWithLid) {
      const [result] = await socket.onWhatsApp(targetUserNumber);
      targetUserJid = result?.lid;
    }

    if (!checkIfMemberIsMuted(remoteJid, targetUserJid)) {
      throw new WarningError("Pengguna ini tidak sedang dibungkam!");
    }

    unmuteMember(remoteJid, targetUserJid);

    await sendSuccessReply("Pengguna berhasil dibatalkan pembungkamannya!");
  },
};
