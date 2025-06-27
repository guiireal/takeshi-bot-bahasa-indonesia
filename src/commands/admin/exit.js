const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError, WarningError } = require(`${BASE_DIR}/errors`);
const {
  activateExitGroup,
  deactivateExitGroup,
  isActiveExitGroup,
} = require(`${BASE_DIR}/utils/database`);

module.exports = {
  name: "exit",
  description:
    "Mengaktifkan/menonaktifkan fitur pengiriman pesan ketika seseorang keluar dari grup.",
  commands: ["exit"],
  usage: `${PREFIX}exit (1/0)`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ args, sendReply, sendSuccessReact, remoteJid }) => {
    if (!args.length) {
      throw new InvalidParameterError(
        "Anda perlu menulis 1 atau 0 (aktifkan atau nonaktifkan)!"
      );
    }

    const exit = args[0] === "1";
    const notExit = args[0] === "0";

    if (!exit && !notExit) {
      throw new InvalidParameterError(
        "Anda perlu menulis 1 atau 0 (aktifkan atau nonaktifkan)!"
      );
    }

    const hasActive = exit && isActiveExitGroup(remoteJid);
    const hasInactive = notExit && !isActiveExitGroup(remoteJid);

    if (hasActive || hasInactive) {
      throw new WarningError(
        `Fitur keluar sudah ${exit ? "diaktifkan" : "dinonaktifkan"}!`
      );
    }

    if (exit) {
      activateExitGroup(remoteJid);
    } else {
      deactivateExitGroup(remoteJid);
    }

    await sendSuccessReact();

    const context = exit ? "diaktifkan" : "dinonaktifkan";

    await sendReply(`Fitur pengiriman pesan keluar berhasil ${context}!`);
  },
};
