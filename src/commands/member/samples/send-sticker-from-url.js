const { PREFIX } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");

module.exports = {
  name: "send-sticker-from-url",
  description: "Contoh cara mengirim stiker dari URL",
  commands: ["send-sticker-from-url"],
  usage: `${PREFIX}send-sticker-from-url`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendStickerFromURL, sendReact }) => {
    await sendReact("🏷️");

    await delay(3000);

    await sendReply("Saya akan mengirim stiker dari URL");

    await delay(3000);

    await sendStickerFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-sticker.webp"
    );

    await delay(3000);

    await sendReply(
      "Untuk mengirim stiker dari URL, gunakan fungsi sendStickerFromURL(url, quoted).\n\n" +
        "Ini berguna saat Anda memiliki stiker yang di-host online atau diperoleh dari API."
    );

    await delay(3000);

    await sendReply(
      "💡 **Tips:** Pastikan URL mengarah ke file .webp yang valid untuk menjamin kompatibilitas."
    );
  },
};
