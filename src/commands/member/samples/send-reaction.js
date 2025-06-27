const { PREFIX } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");

module.exports = {
  name: "send-reaction",
  description: "Contoh berbagai jenis reaksi (emoji)",
  commands: ["send-reaction"],
  usage: `${PREFIX}send-reaction`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    sendReply,
    sendReact,
    sendSuccessReact,
    sendErrorReact,
    sendWarningReact,
    sendWaitReact,
  }) => {
    await sendReply(
      "Saya akan mendemonstrasikan berbagai jenis reaksi yang tersedia:"
    );

    await delay(2000);

    await sendReply("Reaksi kustom:");
    await sendReact("🎉");

    await delay(2000);

    await sendReply("Reaksi sukses:");
    await sendSuccessReact();

    await delay(2000);

    await sendReply("Reaksi error:");
    await sendErrorReact();

    await delay(2000);

    await sendReply("Reaksi peringatan:");
    await sendWarningReact();

    await delay(2000);

    await sendReply("Reaksi tunggu:");
    await sendWaitReact();

    await delay(2000);

    await sendReply("Menguji urutan reaksi:");

    await sendReact("1️⃣");
    await delay(1000);
    await sendReact("2️⃣");
    await delay(1000);
    await sendReact("3️⃣");
    await delay(1000);
    await sendReact("🎯");

    await delay(2000);

    await sendReply(
      "🎭 *Jenis reaksi yang tersedia:*\n\n" +
        "• `sendReact(emoji)` - Reaksi kustom\n" +
        "• `sendSuccessReact()` - Reaksi sukses (✅)\n" +
        "• `sendErrorReact()` - Reaksi error (❌)\n" +
        "• `sendWarningReact()` - Reaksi peringatan (⚠️)\n" +
        "• `sendWaitReact()` - Reaksi tunggu (⏳)\n\n" +
        "Reaksi berguna untuk memberikan umpan balik cepat kepada pengguna!"
    );
  },
};
