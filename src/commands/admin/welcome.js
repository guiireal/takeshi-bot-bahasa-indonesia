const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError, WarningError } = require(`${BASE_DIR}/errors`);
const {
  activateWelcomeGroup,
  deactivateWelcomeGroup,
  isActiveWelcomeGroup,
} = require(`${BASE_DIR}/utils/database`);

module.exports = {
  name: "welcome",
  description: "Mengaktifkan/menonaktifkan fitur selamat datang di grup.",
  commands: ["welcome", "welkom", "welkon"],
  usage: `${PREFIX}welcome (1/0)`,
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

    const welcome = args[0] === "1";
    const notWelcome = args[0] === "0";

    if (!welcome && !notWelcome) {
      throw new InvalidParameterError(
        "Anda perlu menulis 1 atau 0 (aktifkan atau nonaktifkan)!"
      );
    }

    const hasActive = welcome && isActiveWelcomeGroup(remoteJid);
    const hasInactive = notWelcome && !isActiveWelcomeGroup(remoteJid);

    if (hasActive || hasInactive) {
      throw new WarningError(
        `Fitur selamat datang sudah ${
          welcome ? "diaktifkan" : "dinonaktifkan"
        }!`
      );
    }

    if (welcome) {
      activateWelcomeGroup(remoteJid);
    } else {
      deactivateWelcomeGroup(remoteJid);
    }

    await sendSuccessReact();

    const context = welcome ? "diaktifkan" : "dinonaktifkan";

    await sendReply(`Fitur selamat datang berhasil ${context}!`);
  },
};
