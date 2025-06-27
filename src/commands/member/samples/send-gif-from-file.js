const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");
const path = require("node:path");

module.exports = {
  name: "send-gif-from-file",
  description: "Contoh cara mengirim gif dari file lokal",
  commands: ["send-gif-from-file"],
  usage: `${PREFIX}send-gif-from-file`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendGifFromFile, sendReact, userJid }) => {
    await sendReact("🎬");

    await delay(3000);

    await sendReply("Saya akan mengirim gif dari file lokal");

    await delay(3000);

    await sendGifFromFile(path.join(ASSETS_DIR, "samples", "sample-video.mp4"));

    await delay(3000);

    await sendReply("Sekarang dengan keterangan:");

    await delay(3000);

    await sendGifFromFile(
      path.join(ASSETS_DIR, "samples", "sample-video.mp4"),
      "Ini adalah gif dengan keterangan!"
    );

    await delay(3000);

    await sendReply("Sekarang dengan menyebut Anda:");

    await delay(3000);

    await sendGifFromFile(
      path.join(ASSETS_DIR, "samples", "sample-video.mp4"),
      `Halo @${userJid.split("@")[0]}! Gif ini untuk Anda!`,
      [userJid]
    );

    await delay(3000);

    await sendReply("Dan sekarang tanpa membalas pesan Anda:");

    await delay(3000);

    await sendGifFromFile(
      path.join(ASSETS_DIR, "samples", "sample-video.mp4"),
      "Gif tanpa balasan/penyebutan dalam pesan",
      null,
      false
    );

    await delay(3000);

    await sendReply(
      "Untuk mengirim gambar dari file, gunakan fungsi sendGifFromFile(url, caption, [mentions], quoted).\n\n" +
        "Ini berguna saat Anda memiliki gif yang disimpan secara lokal di server."
    );
  },
};
