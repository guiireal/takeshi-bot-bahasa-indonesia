const fs = require("node:fs");
const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const { upload } = require(`${BASE_DIR}/services/upload`);
const { canvas } = require(`${BASE_DIR}/services/spider-x-api`);
const { getRandomNumber } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "invert",
  description:
    "Membuat efek edit dengan warna terbalik menggunakan gambar yang Anda kirimkan",
  commands: ["invertir", "invert", "inverter"],
  usage: `${PREFIX}invert (tandai gambar) atau ${PREFIX}invert (balas gambar)`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    isImage,
    downloadImage,
    sendSuccessReact,
    sendWaitReact,
    sendImageFromURL,
    webMessage,
  }) => {
    if (!isImage) {
      throw new InvalidParameterError(
        "Anda perlu menandai gambar atau membalas gambar!"
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

    const url = canvas("invert", link);

    await sendSuccessReact();

    await sendImageFromURL(url, "Gambar dihasilkan!");

    fs.unlinkSync(filePath);
  },
};
