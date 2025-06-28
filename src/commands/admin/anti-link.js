const { isActiveAntiLinkGroup } = require("../../utils/database");

const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError, WarningError } = require(`${BASE_DIR}/errors`);
const {
  activateAntiLinkGroup,
  deactivateAntiLinkGroup,
} = require(`${BASE_DIR}/utils/database`);

module.exports = {
  name: "anti-link",
  description: "Aktifkan/nonaktifkan fitur anti-link di grup.",
  commands: ["anti-link"],
  usage: `${PREFIX}anti-link (1/0)`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ args, sendReply, sendSuccessReact, remoteJid }) => {
    if (!args.length) {
      throw new InvalidParameterError(
        "Anda perlu mengetik 1 atau 0 (aktifkan atau nonaktifkan)!"
      );
    }

    const antiLinkOn = args[0] === "1";
    const antiLinkOff = args[0] === "0";

    if (!antiLinkOn && !antiLinkOff) {
      throw new InvalidParameterError(
        "Anda perlu mengetik 1 atau 0 (aktifkan atau nonaktifkan)!"
      );
    }

    const hasActive = antiLinkOn && isActiveAntiLinkGroup(remoteJid);
    const hasInactive = antiLinkOff && !isActiveAntiLinkGroup(remoteJid);

    if (hasActive || hasInactive) {
      throw new WarningError(
        `Fitur anti-link sudah ${antiLinkOn ? "diaktifkan" : "dinonaktifkan"}!`
      );
    }

    if (antiLinkOn) {
      activateAntiLinkGroup(remoteJid);
    } else {
      deactivateAntiLinkGroup(remoteJid);
    }

    await sendSuccessReact();

    const context = antiLinkOn ? "diaktifkan" : "dinonaktifkan";

    await sendReply(`Fitur anti-link ${context} dengan sukses!`);
  },
};
