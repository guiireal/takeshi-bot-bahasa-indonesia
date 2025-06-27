const { PREFIX } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");

module.exports = {
  name: "send-image-from-url",
  description: "Contoh cara mengirim gambar dari URL",
  commands: ["send-image-from-url"],
  usage: `${PREFIX}send-image-from-url`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendImageFromURL, sendReact, userJid }) => {
    await sendReact("🖼️");

    await delay(3000);

    await sendReply("Saya akan mengirim gambar dari URL");

    await delay(3000);

    await sendImageFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-image.jpg",
      "Ini adalah keterangan untuk gambar dari URL"
    );

    await delay(3000);

    await sendReply(
      "Anda juga bisa mengirim gambar dari URL tanpa keterangan:"
    );

    await delay(3000);

    await sendImageFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-image.jpg"
    );

    await delay(3000);

    await sendReply(
      "Sekarang saya akan mengirim gambar dari URL dengan menyebut Anda:"
    );

    await delay(3000);

    await sendImageFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-image.jpg",
      `Logo Takeshi Bot untuk Anda ${userJid.split("@")[0]}!`,
      [userJid]
    );

    await sendReply(
      "Untuk mengirim gambar dari URL, gunakan fungsi sendImageFromURL(url, caption, [mentions], quoted).\n\n" +
        "Ini berguna saat Anda memiliki gambar yang di-host online atau diperoleh dari API."
    );
  },
};
