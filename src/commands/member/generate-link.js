const fs = require("node:fs");
const { upload } = require(`${BASE_DIR}/services/upload`);
const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const { getRandomNumber } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "generate-link",
  description: "Mengunggah gambar",
  commands: ["generate-link", "up", "upload"],
  usage: `${PREFIX}generate-link (tandai gambar) atau ${PREFIX}generar-link (balas gambar)`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    isImage,
    downloadImage,
    sendSuccessReact,
    sendWaitReact,
    sendReply,
    webMessage,
  }) => {
    if (!isImage) {
      throw new InvalidParameterError(
        "Anda harus menandai atau membalas sebuah gambar!"
      );
    }

    await sendWaitReact();

    const fileName = getRandomNumber(10_000, 99_999).toString();
    const filePath = await downloadImage(webMessage, fileName);

    const buffer = fs.readFileSync(filePath);

    const link = await upload(buffer, `${fileName}.png`);

    if (!link) {
      throw new Error("Gagal mengunggah gambar, silakan coba lagi.");
    }

    await sendSuccessReact();

    await sendReply(`Ini dia link gambar Anda!\n\n- ${link}`);

    fs.unlinkSync(filePath);
  },
};
