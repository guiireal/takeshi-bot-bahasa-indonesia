/**
 * Dikembangkan oleh: Dev Gui
 * Implementasi metadata dibuat oleh: MRX
 *
 * @author Dev Gui
 */
const { getRandomName } = require(`${BASE_DIR}/utils`);
const fs = require("node:fs");
const { addStickerMetadata } = require(`${BASE_DIR}/services/sticker`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const { PREFIX, BOT_NAME, BOT_EMOJI } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "sticker",
  description:
    "Membuat stiker dari gambar, gif atau video (maksimal 10 detik).",
  commands: ["f", "s", "sticker", "fig"],
  usage: `${PREFIX}sticker (tandai atau balas gambar/gif/video)`,
  handle: async ({
    isImage,
    isVideo,
    downloadImage,
    downloadVideo,
    webMessage,
    sendErrorReply,
    sendWaitReact,
    sendSuccessReact,
    sendStickerFromFile,
    userJid,
  }) => {
    if (!isImage && !isVideo) {
      throw new InvalidParameterError(
        `Anda perlu menandai atau membalas gambar/gif/video!`
      );
    }

    await sendWaitReact();

    const username =
      webMessage.pushName ||
      webMessage.notifyName ||
      userJid.replace(/@s.whatsapp.net/, "");

    const metadata = {
      username: username,
      botName: `${BOT_EMOJI} ${BOT_NAME}`,
    };

    const outputPath = getRandomName("webp");
    let inputPath = null;

    try {
      if (isImage) {
        for (let attempt = 1; attempt <= 3; attempt++) {
          try {
            inputPath = await downloadImage(webMessage, getRandomName());
            break;
          } catch (downloadError) {
            console.error(
              `Percobaan ${attempt} unduh gambar gagal:`,
              downloadError.message
            );

            if (attempt === 3) {
              throw new Error(
                `Gagal mengunduh gambar setelah 3 percobaan: ${downloadError.message}`
              );
            }

            await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
          }
        }

        await new Promise((resolve, reject) => {
          const { exec } = require("child_process");

          const cmd = `ffmpeg -i "${inputPath}" -vf "scale=512:512:force_original_aspect_ratio=decrease" -f webp -quality 90 "${outputPath}"`;

          exec(cmd, (error, _, stderr) => {
            if (error) {
              console.error("FFmpeg error:", stderr);
              reject(error);
            } else {
              resolve();
            }
          });
        });
      } else {
        for (let attempt = 1; attempt <= 3; attempt++) {
          try {
            inputPath = await downloadVideo(webMessage, getRandomName());
            break;
          } catch (downloadError) {
            console.error(
              `Percobaan ${attempt} unduh video gagal:`,
              downloadError.message
            );

            if (attempt === 3) {
              throw new Error(
                `Gagal mengunduh video setelah 3 percobaan. Masalah koneksi dengan WhatsApp.`
              );
            }

            await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
          }
        }

        const maxDuration = 10;
        const seconds =
          webMessage.message?.videoMessage?.seconds ||
          webMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage
            ?.videoMessage?.seconds;

        if (!seconds || seconds > maxDuration) {
          if (inputPath && fs.existsSync(inputPath)) {
            fs.unlinkSync(inputPath);
          }
          return sendErrorReply(
            `Video yang dikirim berdurasi lebih dari ${maxDuration} detik! Kirim video yang lebih pendek.`
          );
        }

        await new Promise((resolve, reject) => {
          const { exec } = require("child_process");

          const cmd = `ffmpeg -y -i "${inputPath}" -vcodec libwebp -fs 0.99M -filter_complex "[0:v] scale=512:512, fps=30, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse" -f webp "${outputPath}"`;

          exec(cmd, (error, _, stderr) => {
            if (error) {
              console.error("FFmpeg error:", stderr);
              reject(error);
            } else {
              resolve();
            }
          });
        });
      }

      if (inputPath && fs.existsSync(inputPath)) {
        fs.unlinkSync(inputPath);
        inputPath = null;
      }

      if (!fs.existsSync(outputPath)) {
        throw new Error("File keluaran tidak dibuat oleh FFmpeg");
      }

      const stickerPath = await addStickerMetadata(
        await fs.promises.readFile(outputPath),
        metadata
      );

      await sendSuccessReact();

      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          await sendStickerFromFile(stickerPath);
          break;
        } catch (stickerError) {
          console.error(
            `Percobaan ${attempt} pengiriman stiker gagal:`,
            stickerError.message
          );

          if (attempt === 3) {
            throw new Error(
              `Gagal mengirim stiker setelah 3 percobaan: ${stickerError.message}`
            );
          }

          await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
        }
      }

      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }
      if (fs.existsSync(stickerPath)) {
        fs.unlinkSync(stickerPath);
      }
    } catch (error) {
      console.error("Error terperinci pada perintah stiker:", error);

      if (inputPath && fs.existsSync(inputPath)) {
        fs.unlinkSync(inputPath);
      }
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }

      if (
        error.message.includes("ETIMEDOUT") ||
        error.message.includes("AggregateError") ||
        error.message.includes("getaddrinfo ENOTFOUND") ||
        error.message.includes("connect ECONNREFUSED") ||
        error.message.includes("mmg.whatsapp.net")
      ) {
        throw new Error(
          `Error koneksi saat mengunduh multimedia dari WhatsApp. Coba lagi dalam beberapa detik.`
        );
      }

      if (error.message.includes("FFmpeg")) {
        throw new Error(
          `Error saat memproses multimedia dengan FFmpeg. Periksa apakah file tidak rusak.`
        );
      }

      throw new Error(`Error saat memproses stiker: ${error.message}`);
    }
  },
};
