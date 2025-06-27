const fs = require("node:fs");
const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const { catBoxUpload } = require(`${BASE_DIR}/services/catbox`);
const { imgbbUpload } = require(`${BASE_DIR}/services/img-bb`);
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

    const filePath = await downloadImage(
      webMessage,
      `${getRandomNumber(10_000, 99_999)}`
    );

    const buffer = fs.readFileSync(filePath);

    let link = null;

    try {
      link = await catBoxUpload(buffer);
    } catch (error) {
      console.log(error);
      link = await imgbbUpload(buffer, {
        name: `upload-${getRandomNumber(1000, 9999)}`,
      });
    }

    await sendSuccessReact();

    await sendReply(`Ini dia link gambar Anda!\n\n- ${link}`);

    fs.unlinkSync(filePath);
  },
};
