const fs = require("node:fs");
const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const { upload } = require(`${BASE_DIR}/services/upload`);
const { canvas } = require(`${BASE_DIR}/services/spider-x-api`);
const { getRandomNumber } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "jail",
  description:
    "Membuat efek edit seolah-olah orang tersebut berada di penjara dengan gambar yang Anda kirimkan",
  commands: ["carcel", "cadeia", "jail"],
  usage: `${PREFIX}jail (tandai gambar) atau ${PREFIX}jail (balas gambar)`,
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

    const url = canvas("jail", link);

    await sendSuccessReact();

    await sendImageFromURL(url, "Gambar dihasilkan!");

    fs.unlinkSync(filePath);
  },
};
