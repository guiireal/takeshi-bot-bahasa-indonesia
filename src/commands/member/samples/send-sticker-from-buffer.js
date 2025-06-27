const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");
const path = require("node:path");
const fs = require("node:fs");
const { getBuffer } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "send-sticker-from-buffer",
  description: "Contoh cara mengirim stiker dari buffer",
  commands: ["send-sticker-from-buffer"],
  usage: `${PREFIX}send-sticker-from-buffer`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendReact, sendStickerFromBuffer }) => {
    await sendReact("🏷️");

    await delay(3000);

    await sendReply("Saya akan mengirim stiker dari buffer file lokal");

    await delay(3000);

    const stickerBuffer = fs.readFileSync(
      path.join(ASSETS_DIR, "samples", "sample-sticker.webp")
    );

    await sendStickerFromBuffer(stickerBuffer);

    await delay(3000);

    await sendReply(
      "Sekarang saya akan mengirim stiker dari buffer URL dan tanpa menyebut pesan"
    );

    await delay(3000);

    const urlBuffer = await getBuffer(
      "https://api.spiderx.com.br/storage/samples/sample-sticker.webp"
    );

    await sendStickerFromBuffer(urlBuffer, false);

    await delay(3000);

    await sendReply(
      "Untuk mengirim stiker dari buffer, gunakan fungsi sendStickerFromBuffer(buffer, quoted)."
    );

    await delay(3000);

    await sendReply(
      "💡 **Tips:** Buffer berguna untuk stiker yang dibuat secara dinamis atau dikonversi dari format lain."
    );
  },
};
