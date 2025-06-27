const { imageAI } = require(`${BASE_DIR}/services/spider-x-api`);

const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "pixart",
  description: "Membuat gambar menggunakan AI Pixart",
  commands: ["pixart"],
  usage: `${PREFIX}pixart deskripsi`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    args,
    sendWaitReply,
    sendWarningReply,
    sendImageFromURL,
    sendSuccessReact,
    fullArgs,
  }) => {
    if (!args[0]) {
      return sendWarningReply("Anda perlu memberikan deskripsi untuk gambar.");
    }

    await sendWaitReply("membuat gambar...");

    const data = await imageAI("pixart", fullArgs);

    if (!data?.image) {
      return sendWarningReply("Tidak dapat membuat gambar! Coba lagi nanti.");
    }

    await sendSuccessReact();
    await sendImageFromURL(data.image);
  },
};
