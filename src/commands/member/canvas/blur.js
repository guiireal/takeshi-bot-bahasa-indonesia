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
  name: "blur",
  description: "Membuat efek edit yang mengaburkan gambar yang Anda kirimkan",
  commands: ["blur", "desenfocar", "desenfoque"],
  usage: `${PREFIX}blur (tandai gambar) atau ${PREFIX}blur (balas gambar)`,
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
      const outputPath = await ffmpeg.applyBlur(filePath);
      await sendSuccessReact();
      await sendImageFromFile(outputPath);
    } catch (error) {
      console.error(error);
      throw new Error("Error saat menerapkan efek blur");
    } finally {
      await ffmpeg.cleanup(filePath);
    }
  },
};
