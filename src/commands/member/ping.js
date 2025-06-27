/**
 * Ditingkatkan oleh: Mkg
 *
 * @author Dev Gui
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "ping",
  description: "Memeriksa apakah bot online, waktu respons dan waktu aktif.",
  commands: ["ping", "pong"],
  usage: `${PREFIX}ping`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendReact, startProcess, fullMessage }) => {
    const response = fullMessage.slice(1).startsWith("ping")
      ? "🏓 ¡Pong!"
      : "🏓 ¡Ping!";

    await sendReact("🏓");

    const uptime = process.uptime();

    const h = Math.floor(uptime / 3600);
    const m = Math.floor((uptime % 3600) / 60);
    const s = Math.floor(uptime % 60);

    const ping = Date.now() - startProcess;

    await sendReply(`${response}

📶 Kecepatan respons: ${ping}ms
⏱️ Waktu aktif: ${h}j ${m}m ${s}d`);
  },
};
