const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");
const path = require("node:path");
const fs = require("node:fs");
const { getBuffer } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "send-gif-from-buffer",
  description: "Contoh cara mengirim gif dari buffer",
  commands: ["send-gif-from-buffer"],
  usage: `${PREFIX}send-gif-from-buffer`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendGifFromBuffer, sendReact, userJid }) => {
    await sendReact("💾");

    await delay(3000);

    await sendReply("Saya akan mengirim gif dari buffer (file lokal dan URL)");

    await delay(3000);

    const fileBuffer = fs.readFileSync(
      path.join(ASSETS_DIR, "samples", "sample-video.mp4")
    );

    await sendGifFromBuffer(fileBuffer);

    await delay(3000);

    await sendReply("Sekarang dari buffer yang diperoleh dari URL:");

    await delay(3000);

    const urlBuffer = await getBuffer(
      "https://api.spiderx.com.br/storage/samples/sample-video.mp4"
    );

    await sendGifFromBuffer(urlBuffer, "GIF dimuat dari URL ke buffer!");

    await delay(3000);

    await sendReply("Dengan penyebutan:");

    await delay(3000);

    await sendGifFromBuffer(
      fileBuffer,
      `@${userJid.split("@")[0]} gif ini berasal dari buffer!`,
      [userJid]
    );

    await delay(3000);

    await sendReply("Dan tanpa membalas pesan Anda:");

    await delay(3000);

    await sendGifFromBuffer(
      fileBuffer,
      "GIF dari buffer tanpa balasan",
      null,
      false
    );

    await delay(3000);

    await sendReply(
      "Untuk mengirim gambar dari file, gunakan fungsi sendGifFromBuffer(buffer, caption, [mentions], quoted).\n\n" +
        "Ini berguna untuk gif yang dibuat secara dinamis atau dikonversi dari format lain!"
    );

    await delay(3000);

    await sendReply(
      "💾 *Keuntungan buffer:*\n\n" +
        "• Pemrosesan dalam memori\n" +
        "• Konversi format\n" +
        "• Manipulasi data\n" +
        "• Cache sementara\n\n" +
        "💡 *Tips:* Buffer berguna untuk GIF yang dibuat secara dinamis atau dikonversi!"
    );
  },
};
