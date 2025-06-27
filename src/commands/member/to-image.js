const { PREFIX, TEMP_DIR } = require(`${BASE_DIR}/config`);
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const { getRandomNumber } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "toimage",
  description: "Mengubah stiker statis menjadi gambar",
  commands: ["toimage", "toimg"],
  usage: `${PREFIX}toimage (tandai stiker) atau ${PREFIX}toimage (balas stiker)`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    isSticker,
    downloadSticker,
    webMessage,
    sendWaitReact,
    sendSuccessReact,
    sendImageFromFile,
  }) => {
    if (!isSticker) {
      throw new InvalidParameterError("Anda perlu mengirim stiker!");
    }

    await sendWaitReact();

    const inputPath = await downloadSticker(webMessage, "input");
    const outputPath = path.resolve(
      TEMP_DIR,
      `${getRandomNumber(10_000, 99_999)}.png`
    );

    exec(`ffmpeg -i ${inputPath} ${outputPath}`, async (error) => {
      if (error) {
        console.log(error);
        throw new Error(error);
      }

      await sendSuccessReact();

      await sendImageFromFile(outputPath);
    });
  },
};
