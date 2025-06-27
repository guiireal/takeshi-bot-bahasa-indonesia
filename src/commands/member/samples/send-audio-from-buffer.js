const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");
const fs = require("node:fs");
const path = require("node:path");
const { getBuffer } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "send-audio-from-buffer",
  description: "Contoh cara mengirim audio melalui buffer",
  commands: ["send-audio-from-buffer"],
  usage: `${PREFIX}send-audio-from-buffer`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendAudioFromBuffer, sendReact }) => {
    await sendReact("🔈");

    await delay(3000);

    await sendReply(
      "Saya akan mengirim audio dari buffer yang diekstrak dari URL, saya akan mengirimnya sebagai pemutaran file."
    );

    await delay(3000);

    await sendAudioFromBuffer(
      await getBuffer(
        "https://api.spiderx.com.br/storage/samples/sample-audio.mp3"
      )
    );

    await delay(3000);

    await sendReply(
      "Sekarang saya akan mengirim audio dari buffer yang diekstrak dari file, tetapi seolah-olah saya yang merekam audionya."
    );

    await delay(3000);

    await sendAudioFromBuffer(
      fs.readFileSync(path.join(ASSETS_DIR, "samples", "sample-audio.mp3")),
      true
    );

    await delay(3000);

    await sendReply(
      "Sekarang saya akan mengirim audio dari buffer yang diekstrak dari file, tetapi tanpa menyebut di atas pesan Anda."
    );

    await delay(3000);

    await sendAudioFromBuffer(
      fs.readFileSync(path.join(ASSETS_DIR, "samples", "sample-audio.mp3")),
      false,
      false
    );

    await delay(3000);

    await sendReply(
      "Dan akhirnya, saya akan mengirim audio dari buffer yang diekstrak dari URL, seolah-olah saya yang merekamnya, tetapi tanpa menyebut di atas pesan Anda."
    );

    await delay(3000);

    await sendAudioFromBuffer(
      await getBuffer(
        "https://api.spiderx.com.br/storage/samples/sample-audio.mp3"
      ),
      true,
      false
    );
  },
};
