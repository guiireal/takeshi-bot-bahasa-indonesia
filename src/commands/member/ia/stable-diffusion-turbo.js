const { imageAI } = require(`${BASE_DIR}/services/spider-x-api`);

const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "stable-diffusion-turbo",
  description: "Membuat gambar menggunakan AI Stable Diffusion Turbo",
  commands: [
    "stable-diffusion-turbo",
    "stable-dif-turbo",
    "stable-dif",
    "stable-diff-turbo",
    "stable-diff",
    "stable-diffusion",
    "stable-difusion-turbo",
    "stable-difusion",
  ],
  usage: `${PREFIX}stable-diffusion-turbo deskripsi`,
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

    const data = await imageAI("stable-diffusion-turbo", fullArgs);

    if (!data?.image) {
      return sendWarningReply("Tidak dapat membuat gambar! Coba lagi nanti.");
    }

    await sendSuccessReact();
    await sendImageFromURL(data.image);
  },
};
