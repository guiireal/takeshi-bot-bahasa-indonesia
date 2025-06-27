const { PREFIX } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");

module.exports = {
  name: "send-quoted",
  description:
    "Contoh berbagai jenis balasan (sukses, error, peringatan, tunggu)",
  commands: ["send-quoted"],
  usage: `${PREFIX}send-quoted`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    sendReply,
    sendSuccessReply,
    sendErrorReply,
    sendWarningReply,
    sendWaitReply,
    sendReact,
  }) => {
    await sendReact("💬");

    await delay(3000);

    await sendReply(
      "Saya akan mendemonstrasikan berbagai jenis balasan yang tersedia:"
    );

    await delay(3000);

    await sendSuccessReply("Ini adalah pesan sukses! ✅");

    await delay(3000);

    await sendErrorReply("Ini adalah pesan error! ❌");

    await delay(3000);

    await sendWarningReply("Ini adalah pesan peringatan! ⚠️");

    await delay(3000);

    await sendWaitReply("Ini adalah pesan tunggu! ⏳");

    await delay(3000);

    await sendReply("Dan ini adalah balasan normal menggunakan sendReply");

    await delay(3000);

    await sendReply(
      "📋 *Jenis balasan yang tersedia:*\n\n" +
        "• `sendReply()` - Balasan normal\n" +
        "• `sendSuccessReply()` - Balasan sukses (dengan ✅)\n" +
        "• `sendErrorReply()` - Balasan error (dengan ❌)\n" +
        "• `sendWarningReply()` - Balasan peringatan (dengan ⚠️)\n" +
        "• `sendWaitReply()` - Balasan tunggu (dengan ⏳)\n\n" +
        "Gunakan masing-masing sesuai konteks yang tepat!"
    );
  },
};
