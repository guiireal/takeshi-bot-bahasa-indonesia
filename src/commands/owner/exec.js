/**
 * Dikembangkan oleh: Mkg
 * Direfaktor oleh: Dev Gui
 *
 * @author Dev Gui
 */
const { exec } = require("child_process");
const { isBotOwner } = require(`${BASE_DIR}/middlewares`);
const { PREFIX } = require(`${BASE_DIR}/config`);
const { DangerError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "exec",
  description: "Menjalankan perintah terminal langsung dari bot.",
  commands: ["exec"],
  usage: `${PREFIX}exec perintah`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    fullArgs,
    sendSuccessReply,
    sendErrorReply,
    userJid,
    isLid,
  }) => {
    if (!isBotOwner({ userJid, isLid })) {
      throw new DangerError(
        "Hanya pemilik bot yang dapat menggunakan perintah ini!"
      );
    }

    if (!fullArgs) {
      throw new DangerError(`Penggunaan yang benar: ${PREFIX}exec perintah`);
    }

    exec(fullArgs, (error, stdout) => {
      if (error) {
        return sendErrorReply(`Error saat menjalankan: ${error.message}`);
      }

      const output = stdout || "Perintah dijalankan tanpa output.";

      return sendSuccessReply(
        `Hasil:\n\`\`\`\n${output.trim().slice(0, 4000)}\n\`\`\``
      );
    });
  },
};
