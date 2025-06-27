const { PREFIX } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");

module.exports = {
  name: "send-gif-from-url",
  description: "Contoh cara mengirim gif dari URL eksternal",
  commands: ["send-gif-from-url"],
  usage: `${PREFIX}send-gif-from-url`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendGifFromURL, sendReact, userJid }) => {
    await sendReact("🌐");

    await delay(3000);

    await sendReply("Saya akan mengirim gif dari URL eksternal");

    await delay(3000);

    await sendGifFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-video.mp4"
    );

    await delay(3000);

    await sendReply("Sekarang dengan keterangan:");

    await delay(3000);

    await sendGifFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-video.mp4",
      "GIF dimuat dari URL eksternal!"
    );

    await delay(3000);

    await sendReply("Dengan penyebutan:");

    await delay(3000);

    await sendGifFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-video.mp4",
      `Halo @${userJid.split("@")[0]}! Lihat betapa kerennya gif ini!`,
      [userJid]
    );

    await delay(3000);

    await sendReply("Dan tanpa membalas pesan Anda:");

    await delay(3000);

    await sendGifFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-video.mp4",
      "GIF tanpa balasan",
      undefined,
      false
    );

    await delay(3000);

    await sendReply(
      "Untuk mengirim gambar dari file, gunakan fungsi sendGifFromURL(url, caption, [mentions], quoted).\n\n" +
        "Ini berguna saat Anda memiliki gambar yang di-host online atau diperoleh dari API."
    );

    await delay(3000);

    await sendReply(
      "🌐 *URL berguna untuk GIF:*\n\n" +
        "• Giphy: giphy.com\n" +
        "• Tenor: tenor.com\n" +
        "• API GIF online\n\n" +
        "💡 *Tips:* Pastikan URL mengarah langsung ke file video!"
    );
  },
};
