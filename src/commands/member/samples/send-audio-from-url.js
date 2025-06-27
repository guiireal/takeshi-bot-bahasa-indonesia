const { PREFIX } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");

module.exports = {
  name: "send-audio-from-url",
  description: "Contoh cara mengirim audio melalui tautan/url",
  commands: ["send-audio-from-url"],
  usage: `${PREFIX}send-audio-from-url`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendAudioFromURL, sendReact }) => {
    await sendReact("🔈");

    await delay(3000);

    await sendReply(
      "Saya akan mengirim audio dari tautan, saya akan mengirimnya sebagai pemutaran file."
    );

    await delay(3000);

    await sendAudioFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-audio.mp3"
    );

    await delay(3000);

    await sendReply(
      "Sekarang saya akan mengirim audio dari tautan, tetapi seolah-olah saya yang merekam audionya."
    );

    await delay(3000);

    await sendAudioFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-audio.mp3",
      true
    );

    await delay(3000);

    await sendReply(
      "Sekarang saya akan mengirim audio dari tautan, tetapi tanpa menyebut di atas pesan Anda."
    );

    await delay(3000);

    await sendAudioFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-audio.mp3",
      false,
      false
    );

    await delay(3000);

    await sendReply(
      "Dan akhirnya, saya akan mengirim audio dari tautan, seolah-olah saya yang merekamnya, tetapi tanpa menyebut di atas pesan Anda."
    );

    await delay(3000);

    await sendAudioFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-audio.mp3",
      true,
      false
    );
  },
};
