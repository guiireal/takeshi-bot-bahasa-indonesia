const fs = require("node:fs");
const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError, DangerError } = require(`${BASE_DIR}/errors`);
const {
  isAnimatedSticker,
  processStaticSticker,
  processAnimatedSticker,
  addStickerMetadata,
} = require(`${BASE_DIR}/services/sticker`);
const { getRandomName } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "rename",
  description: "Menambahkan metadata baru ke stiker.",
  commands: ["rename", "rn"],
  usage: `${PREFIX}rename paket / penulis (balas ke stiker)`,
  handle: async ({
    isSticker,
    downloadSticker,
    webMessage,
    sendWaitReact,
    sendSuccessReact,
    sendStickerFromFile,
    args,
  }) => {
    if (!isSticker) {
      throw new InvalidParameterError("Anda perlu membalas ke stiker!");
    }

    if (args.length !== 2) {
      throw new InvalidParameterError(
        "Anda perlu memberikan paket dan penulis dalam format: paket / penulis"
      );
    }

    const pack = args[0];
    const author = args[1];

    if (!pack || !author) {
      throw new InvalidParameterError(
        "Anda perlu memberikan paket dan penulis dalam format: paket / penulis"
      );
    }

    const minLength = 2;
    const maxLength = 50;

    if (pack.length < minLength || pack.length > maxLength) {
      throw new DangerError(
        `Paket harus memiliki antara ${minLength} dan ${maxLength} karakter.`
      );
    }

    if (author.length < minLength || author.length > maxLength) {
      throw new DangerError(
        `Penulis harus memiliki antara ${minLength} dan ${maxLength} karakter.`
      );
    }

    let finalStickerPath = null;

    await sendWaitReact();

    const inputPath = await downloadSticker(webMessage, getRandomName("webp"));

    try {
      const metadata = {
        username: pack,
        botName: author,
      };

      const isAnimated = await isAnimatedSticker(inputPath);

      if (isAnimated) {
        finalStickerPath = await processAnimatedSticker(
          inputPath,
          metadata,
          addStickerMetadata
        );
      } else {
        finalStickerPath = await processStaticSticker(
          inputPath,
          metadata,
          addStickerMetadata
        );
      }

      await sendSuccessReact();

      await sendStickerFromFile(finalStickerPath);
    } catch (error) {
      throw new Error(`Error saat mengganti nama stiker: ${error.message}`);
    } finally {
      if (fs.existsSync(inputPath)) {
        fs.unlinkSync(inputPath);
      }

      if (finalStickerPath && fs.existsSync(finalStickerPath)) {
        fs.unlinkSync(finalStickerPath);
      }
    }
  },
};
