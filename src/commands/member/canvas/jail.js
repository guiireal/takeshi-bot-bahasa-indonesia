const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const fs = require("fs");
const { canvas } = require(`${BASE_DIR}/services/spider-x-api`);
const { catBoxUpload } = require(`${BASE_DIR}/services/catbox`);
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

    const filePath = await downloadImage(
      webMessage,
      `${getRandomNumber(10_000, 99_999)}`
    );

    const buffer = fs.readFileSync(filePath);
    const link = await catBoxUpload(buffer);
    const url = canvas("jail", link);

    await sendSuccessReact();

    await sendImageFromURL(url, "Gambar dihasilkan!");

    fs.unlinkSync(filePath);
  },
};
