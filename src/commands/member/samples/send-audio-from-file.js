const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");
const path = require("node:path");
module.exports = {
  name: "send-audio-from-file",
  description: "Contoh cara mengirim audio melalui file",
  commands: ["send-audio-from-file"],
  usage: `${PREFIX}send-audio-from-file`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendAudioFromFile, sendReact }) => {
    await sendReact("🔈");

    await delay(3000);

    await sendReply(
      "Saya akan mengirim audio dari file, saya akan mengirimnya sebagai pemutaran file."
    );

    await delay(3000);

    await sendAudioFromFile(
      path.join(ASSETS_DIR, "samples", "sample-audio.mp3")
    );

    await delay(3000);

    await sendReply(
      "Sekarang saya akan mengirim audio dari file, tetapi seolah-olah saya yang merekam audionya."
    );

    await delay(3000);

    await sendAudioFromFile(
      path.join(ASSETS_DIR, "samples", "sample-audio.mp3"),
      true
    );

    await delay(3000);

    await sendReply(
      "Sekarang saya akan mengirim audio dari file, tetapi tanpa menyebut di atas pesan Anda."
    );

    await delay(3000);

    await sendAudioFromFile(
      path.join(ASSETS_DIR, "samples", "sample-audio.mp3"),
      false,
      false
    );

    await delay(3000);

    await sendReply(
      "Dan akhirnya, saya akan mengirim audio dari file, seolah-olah saya yang merekamnya, tetapi tanpa menyebut di atas pesan Anda."
    );

    await delay(3000);

    await sendAudioFromFile(
      path.join(ASSETS_DIR, "samples", "sample-audio.mp3"),
      true,
      false
    );
  },
};
