const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");
const path = require("node:path");
const fs = require("node:fs");
const { getBuffer } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "send-video-from-buffer",
  description: "Contoh cara mengirim video dari buffer",
  commands: ["send-video-from-buffer"],
  usage: `${PREFIX}send-video-from-buffer`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendReact, sendVideoFromBuffer, userJid }) => {
    await sendReact("🎥");

    await delay(3000);

    await sendReply("Saya akan mengirim video dari buffer file lokal");

    await delay(3000);

    const videoBuffer = fs.readFileSync(
      path.join(ASSETS_DIR, "samples", "sample-video.mp4")
    );

    await sendVideoFromBuffer(videoBuffer, "Ini video dari buffer lokal");

    await delay(3000);

    await sendReply("Sekarang saya akan mengirim video dari buffer URL");

    await delay(3000);

    const urlBuffer = await getBuffer(
      "https://api.spiderx.com.br/storage/samples/sample-video.mp4"
    );

    await sendVideoFromBuffer(urlBuffer, "Ini video dari buffer URL");

    await delay(3000);

    await sendReply("Anda juga bisa mengirim video buffer tanpa keterangan");

    await delay(3000);

    await sendVideoFromBuffer(videoBuffer);

    await delay(3000);

    await sendReply("Juga video buffer dengan keterangan, menyebut pengguna:");

    await delay(3000);

    await sendVideoFromBuffer(
      await getBuffer(
        "https://api.spiderx.com.br/storage/samples/sample-video.mp4"
      ),
      `Ini video yang Anda minta @${userJid.split("@")[0]}!`,
      [userJid]
    );

    await delay(3000);

    await sendReply(
      "Untuk mengirim video dari buffer, gunakan fungsi sendVideoFromBuffer(url, caption, [mentions], quoted).\n\n" +
        "Ini berguna saat Anda memiliki video yang di-host online atau diperoleh dari API."
    );
  },
};
