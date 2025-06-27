/**
 * Dikembangkan oleh: MRX
 * Diperbaiki oleh: Dev Gui
 *
 * @author Dev Gui
 */
const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const Ffmpeg = require(`${BASE_DIR}/services/ffmpeg`);

module.exports = {
  name: "mirror",
  description: "Invierte la posición de la imagen que envíes",
  commands: ["espelhar", "espejar", "mirror"],
  usage: `${PREFIX}mirror (tandai gambar) atau ${PREFIX}espelhar (balas gambar)`,
  handle: async ({
    isImage,
    downloadImage,
    sendSuccessReact,
    sendWaitReact,
    sendImageFromFile,
    webMessage,
  }) => {
    if (!isImage) {
      throw new InvalidParameterError(
        "Anda perlu menandai gambar atau membalas gambar!"
      );
    }

    await sendWaitReact();
    const filePath = await downloadImage(webMessage);
    const ffmpeg = new Ffmpeg();

    try {
      const outputPath = await ffmpeg.mirrorImage(filePath);
      await sendSuccessReact();
      await sendImageFromFile(outputPath);
    } catch (error) {
      console.error(error);
      throw new Error("Error saat menerapkan efek cermin");
    } finally {
      await ffmpeg.cleanup(filePath);
    }
  },
};
