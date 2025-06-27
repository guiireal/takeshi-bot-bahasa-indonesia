const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");
const path = require("node:path");

module.exports = {
  name: "send-video-from-file",
  description: "Contoh cara mengirim video dari file lokal",
  commands: ["send-video-from-file"],
  usage: `${PREFIX}send-video-from-file`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendVideoFromFile, sendReact }) => {
    await sendReact("🎥");

    await delay(3000);

    await sendReply("Saya akan mengirim video dari file lokal");

    await delay(3000);

    await sendVideoFromFile(
      path.join(ASSETS_DIR, "samples", "sample-video.mp4"),
      "Ini adalah video contoh dengan keterangan"
    );

    await delay(3000);

    await sendReply("Anda juga bisa mengirim video tanpa keterangan:");

    await delay(3000);

    await sendVideoFromFile(
      path.join(ASSETS_DIR, "samples", "sample-video.mp4")
    );

    await delay(3000);

    await sendReply(
      "Untuk mengirim video dari file, gunakan fungsi sendVideoFromFile(filePath, caption, [mentions], quoted).\n\n" +
        "Ini berguna saat Anda memiliki video yang disimpan secara lokal di server."
    );

    await delay(3000);

    await sendReply(
      "💡 **Tips:** Format yang kompatibel meliputi MP4, AVI, MOV, dll. WhatsApp akan mengkonversinya secara otomatis jika diperlukan."
    );
  },
};
