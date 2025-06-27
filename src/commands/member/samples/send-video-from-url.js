const { PREFIX } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");

module.exports = {
  name: "send-video-from-url",
  description: "Contoh cara mengirim video dari URL",
  commands: ["send-video-from-url"],
  usage: `${PREFIX}send-video-from-url`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendVideoFromURL, sendReact, userJid }) => {
    await sendReact("🎥");

    await delay(3000);

    await sendReply("Saya akan mengirim video dari URL");

    await delay(3000);

    await sendVideoFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-video.mp4"
    );

    await delay(3000);

    await sendReply("Juga mengirim tanpa menyebut pesan pengguna:");

    await delay(3000);

    await sendVideoFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-video.mp4",
      null,
      false
    );

    await delay(3000);

    await sendReply("Anda juga bisa mengirim video dengan keterangan:");

    await delay(3000);

    await sendVideoFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-video.mp4",
      "Ini video yang Anda minta!"
    );

    await delay(3000);

    await sendReply("Juga video dengan keterangan, menyebut pengguna:");

    await delay(3000);

    await sendVideoFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-video.mp4",
      `Ini video yang Anda minta @${userJid.split("@")[0]}!`,
      [userJid]
    );

    await delay(3000);

    await sendReply(
      "Untuk mengirim video dari URL, gunakan fungsi sendVideoFromURL(url, caption, [mentions], quoted).\n\n" +
        "Ini berguna saat Anda memiliki video yang di-host online atau diperoleh dari API."
    );

    await delay(3000);

    await sendReply(
      "💡 **Tips:** Pastikan URL mengarah ke file video yang valid dan dapat diakses."
    );
  },
};
