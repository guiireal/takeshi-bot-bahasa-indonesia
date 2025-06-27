const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");
const path = require("node:path");

module.exports = {
  name: "send-image-from-file",
  description: "Contoh cara mengirim gambar dari file lokal",
  commands: ["send-image-from-file"],
  usage: `${PREFIX}send-image-from-file`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendImageFromFile, sendReact, userJid }) => {
    await sendReact("🖼️");

    await delay(3000);

    await sendReply("Saya akan mengirim gambar dari file lokal");

    await delay(3000);

    await sendImageFromFile(
      path.join(ASSETS_DIR, "samples", "sample-image.jpg"),
      "Ini adalah keterangan opsional untuk gambar"
    );

    await delay(3000);

    await sendReply("Anda juga bisa mengirim gambar tanpa keterangan:");

    await delay(3000);

    await sendImageFromFile(
      path.join(ASSETS_DIR, "samples", "sample-image.jpg")
    );

    await delay(3000);

    await sendReply("Atau menggunakan gambar lain dari proyek:");

    await delay(3000);

    await sendImageFromFile(
      path.join(ASSETS_DIR, "images", "takeshi-bot.png"),
      "Logo Takeshi Bot!"
    );

    await delay(3000);

    await sendReply(
      "Sekarang saya akan mengirim gambar dari file dengan menyebut Anda:"
    );

    await delay(3000);

    await sendImageFromFile(
      path.join(ASSETS_DIR, "images", "takeshi-bot.png"),
      `Logo Takeshi Bot untuk Anda @${userJid.split("@")[0]}!`,
      [userJid]
    );

    await delay(3000);

    await sendReply(
      "Untuk mengirim gambar dari file, gunakan fungsi sendImageFromFile(filePath, caption, [mentions], quoted).\n\n" +
        "Ini berguna saat Anda memiliki gambar yang disimpan secara lokal di server."
    );
  },
};
