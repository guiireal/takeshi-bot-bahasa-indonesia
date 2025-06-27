const fs = require("node:fs");
const path = require("node:path");
const { errorLog } = require(`${BASE_DIR}/utils/logger`);
const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "set-menu-image",
  description: "Mengubah gambar menu bot",
  commands: ["set-menu-image", "set-image", "set-img-menu", "set-menu-img"],
  usage: `${PREFIX}set-menu-image (balas ke gambar)`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    isImage,
    isReply,
    downloadImage,
    sendSuccessReply,
    sendErrorReply,
    webMessage,
  }) => {
    if (!isReply || !isImage) {
      throw new InvalidParameterError(
        "Anda perlu membalas pesan yang berisi gambar!"
      );
    }

    try {
      const menuImagePath = path.join(ASSETS_DIR, "images", "takeshi-bot.png");

      let backupPath = "";

      if (fs.existsSync(menuImagePath)) {
        backupPath = path.join(ASSETS_DIR, "images", "takeshi-bot-backup.png");

        fs.copyFileSync(menuImagePath, backupPath);
      }

      const tempPath = await downloadImage(webMessage, "new-menu-image-temp");

      if (fs.existsSync(menuImagePath)) {
        fs.unlinkSync(menuImagePath);
      }

      fs.renameSync(tempPath, menuImagePath);

      await sendSuccessReply("Gambar menu berhasil diperbarui!");
    } catch (error) {
      errorLog(`Error saat mengubah gambar menu: ${error}`);
      await sendErrorReply(
        "Terjadi error saat mencoba mengubah gambar menu. Silakan coba lagi."
      );
    }
  },
};
