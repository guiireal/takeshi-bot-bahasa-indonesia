const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const {
  activateAutoResponderGroup,
  deactivateAutoResponderGroup,
} = require(`${BASE_DIR}/utils/database`);

module.exports = {
  name: "auto-responder",
  description: "Mengaktifkan/menonaktifkan fitur auto-responder di grup.",
  commands: ["auto-responder"],
  usage: `${PREFIX}auto-responder (1/0)`,
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

    const autoResponder = args[0] === "1";
    const notAutoResponder = args[0] === "0";

    if (!autoResponder && !notAutoResponder) {
      throw new InvalidParameterError(
        "Anda perlu menulis 1 atau 0 (aktifkan atau nonaktifkan)!"
      );
    }

    if (autoResponder) {
      activateAutoResponderGroup(remoteJid);
    } else {
      deactivateAutoResponderGroup(remoteJid);
    }

    await sendSuccessReact();

    const context = autoResponder ? "diaktifkan" : "dinonaktifkan";

    await sendReply(`Fitur auto-responder berhasil ${context}!`);
  },
};
