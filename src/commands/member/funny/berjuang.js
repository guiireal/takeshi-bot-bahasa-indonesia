const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const { toUserJid, onlyNumbers } = require(`${BASE_DIR}/utils`);
const path = require("node:path");
const { ASSETS_DIR } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "berjuang",
  description: "Bertarung satu lawan satu atau pukul musuh Anda!",
  commands: ["berjuang"],
  usage: `${PREFIX}berjuang @pengguna`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    sendGifFromFile,
    sendErrorReply,
    userJid,
    replyJid,
    args,
    isReply,
  }) => {
    if (!args.length && !isReply) {
      throw new InvalidParameterError(
        "Anda perlu menyebutkan atau menandai anggota!"
      );
    }

    const targetJid = isReply ? replyJid : toUserJid(args[0]);

    if (!targetJid) {
      await sendErrorReply(
        "Anda harus menyebutkan pengguna atau membalas pesan untuk berkelahi."
      );
      return;
    }

    const userNumber = onlyNumbers(userJid);
    const targetNumber = onlyNumbers(targetJid);

    await sendGifFromFile(
      path.resolve(ASSETS_DIR, "images", "funny", "sung-jin-woo-jinwoo.mp4"),
      `@${userNumber} bertarung sengit dengan @${targetNumber}!`,
      [userJid, targetJid]
    );
  },
};
