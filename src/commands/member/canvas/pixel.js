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
  name: "pixel",
  description:
    "Genero una edición que convierte la imagen que envíes a pixel-art",
  commands: ["pixel", "pixel-art", "px"],
  usage: `${PREFIX}pixel (tandai gambar) atau ${PREFIX}pixel (balas gambar)`,
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
      const outputPath = await ffmpeg.applyPixelation(filePath);
      await sendSuccessReact();
      await sendImageFromFile(outputPath);
    } catch (error) {
      console.error(error);
      throw new Error("Error saat menerapkan efek pixel");
    } finally {
      await ffmpeg.cleanup(filePath);
    }
  },
};
