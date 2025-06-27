const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");
const path = require("node:path");

module.exports = {
  name: "send-sticker-from-file",
  description: "Contoh cara mengirim stiker dari file lokal",
  commands: ["send-sticker-from-file"],
  usage: `${PREFIX}send-sticker-from-file`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendStickerFromFile, sendReact }) => {
    await sendReact("🏷️");

    await delay(3000);

    await sendReply("Saya akan mengirim stiker dari file lokal");

    await delay(3000);

    await sendStickerFromFile(
      path.join(ASSETS_DIR, "samples", "sample-sticker.webp")
    );

    await delay(3000);

    await sendReply("Anda juga bisa menggunakan stiker lain dari proyek:");

    await delay(3000);

    await sendStickerFromFile(
      path.join(ASSETS_DIR, "samples", "sample-sticker.webp")
    );

    await delay(3000);

    await sendReply(
      "Untuk mengirim stiker dari file, gunakan fungsi sendStickerFromFile(filePath, quoted).\n\n" +
        "Ini berguna saat Anda memiliki stiker yang disimpan secara lokal di server."
    );

    await delay(3000);

    await sendReply(
      "💡 **Tips:** Format ideal untuk stiker adalah .webp. Format lain mungkin perlu konversi."
    );
  },
};
