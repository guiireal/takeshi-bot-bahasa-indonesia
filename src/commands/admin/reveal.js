const { DEFAULT_PREFIX, TEMP_DIR } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const path = require("node:path");
const fs = require("node:fs");
const ffmpeg = require("fluent-ffmpeg");
const { getRandomName } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "reveal",
  description: "Mengungkap gambar atau video sekali lihat",
  commands: ["reveal", "rv"],
  usage: `${DEFAULT_PREFIX}reveal (tag gambar/video) atau ${DEFAULT_PREFIX}reveal (balas gambar/video).`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    isImage,
    isVideo,
    downloadImage,
    downloadVideo,
    webMessage,
    sendSuccessReact,
    sendWaitReact,
    sendImageFromFile,
    sendVideoFromFile,
  }) => {
    if (!isImage && !isVideo) {
      throw new InvalidParameterError(
        "Anda perlu menandai gambar/video atau membalas gambar/video untuk mengungkapkannya!"
      );
    }

    await sendWaitReact();

    const mediaCaption =
      webMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage?.[
        isImage ? "imageMessage" : "videoMessage"
      ]?.caption || `Ini ${isImage ? "gambar" : "video"} yang terungkap!`;

    const outputPath = path.resolve(
      TEMP_DIR,
      `${getRandomName()}.${isImage ? "jpg" : "mp4"}`
    );

    let inputPath;

    try {
      if (isImage) {
        inputPath = await downloadImage(webMessage, "input");

        await new Promise((resolve, reject) => {
          ffmpeg(inputPath)
            .outputOptions("-q:v 2")
            .on("end", async () => {
              await sendImageFromFile(outputPath, mediaCaption);
              await sendSuccessReact();
              resolve();
            })
            .on("error", (err) => {
              console.error("Error FFmpeg:", err);
              reject(err);
            })
            .save(outputPath);
        });
      } else if (isVideo) {
        inputPath = await downloadVideo(webMessage, "input");

        await new Promise((resolve, reject) => {
          ffmpeg(inputPath)
            .outputOptions("-c copy")
            .on("end", async () => {
              await sendVideoFromFile(outputPath, mediaCaption);
              await sendSuccessReact();
              resolve();
            })
            .on("error", (err) => {
              console.error("Error FFmpeg:", err);
              reject(err);
            })
            .save(outputPath);
        });
      }
    } catch (error) {
      console.error("Error umum:", error);
      throw new Error("Terjadi error saat memproses media. Coba lagi.");
    } finally {
      const cleanFile = (filePath) => {
        if (filePath && fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath);
          } catch (cleanError) {
            console.error("Error saat membersihkan file:", cleanError);
          }
        }
      };

      cleanFile(inputPath);
      cleanFile(outputPath);
    }
  },
};
