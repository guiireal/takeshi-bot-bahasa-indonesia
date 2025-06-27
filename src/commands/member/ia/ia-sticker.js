const { imageAI } = require(`${BASE_DIR}/services/spider-x-api`);

const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "ia-sticker",
  description: "Membuat stiker berdasarkan deskripsi",
  commands: ["ia-sticker", "ia-fig"],
  usage: `${PREFIX}ia-sticker deskripsi`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    args,
    sendWaitReply,
    sendWarningReply,
    sendStickerFromURL,
    sendSuccessReact,
    fullArgs,
  }) => {
    if (!args[0]) {
      return sendWarningReply("Anda perlu memberikan deskripsi untuk gambar.");
    }

    await sendWaitReply("membuat stiker...");

    const data = await imageAI("stable-diffusion-turbo", fullArgs);

    if (data.image) {
      await sendStickerFromURL(data.image);
      await sendSuccessReact();
    } else {
      await sendWarningReply("Tidak dapat membuat stiker. Coba lagi nanti.");
    }
  },
};
