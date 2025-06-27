/**
 * Dikembangkan oleh: Mkg
 * Direfaktor oleh: Dev Gui
 *
 * @author Dev Gui
 */
const { delay } = require("baileys");

const { getRandomNumber } = require(`${BASE_DIR}/utils`);

const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { DangerError } = require(`${BASE_DIR}/errors`);
const path = require("node:path");

module.exports = {
  name: "diberikan",
  description: "Lempar dadu dari 1 sampai 6 dan coba tebak angka untuk menang!",
  commands: ["diberikan"],
  usage: `${PREFIX}diberikan angka`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    args,
    sendWaitReply,
    sendReply,
    sendStickerFromURL,
    sendReact,
    webMessage,
  }) => {
    const number = parseInt(args[0]);

    if (!number || number < 1 || number > 6) {
      throw new DangerError(
        `Silakan pilih angka antara 1 dan 6!\nContoh: ${PREFIX}dadu 3`
      );
    }

    await sendWaitReply("🎲 Melempar dadu...");

    const result = getRandomNumber(1, 6);

    const pushName = webMessage?.pushName || "Pengguna";

    await sendStickerFromURL(
      path.resolve(ASSETS_DIR, "stickers", "dice", `${result}.webp`)
    );

    await delay(2000);

    if (number === result) {
      await sendReact("🏆");
      await sendReply(
        `🎉 *${pushName} MENANG!* Anda bertaruh pada angka *${number}* dan dadu jatuh pada *${result}*! 🍀`
      );
    } else {
      await sendReact("😭");
      await sendReply(
        `💥 *${pushName} KALAH...* Anda bertaruh pada *${number}* tapi dadu jatuh pada *${result}*! Coba lagi.`
      );
    }
  },
};
