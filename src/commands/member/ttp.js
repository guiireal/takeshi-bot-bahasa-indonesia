const { PREFIX } = require(`${BASE_DIR}/config`);
const { ttp } = require(`${BASE_DIR}/services/spider-x-api`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "ttp",
  description: "Membuat stiker teks.",
  commands: ["ttp"],
  usage: `${PREFIX}ttp percobaan`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    sendWaitReact,
    args,
    sendStickerFromURL,
    sendSuccessReact,
  }) => {
    if (!args.length) {
      throw new InvalidParameterError(
        "Anda perlu memasukkan teks yang ingin diubah menjadi stiker."
      );
    }

    await sendWaitReact();

    const url = await ttp(args[0].trim());

    await sendSuccessReact();

    await sendStickerFromURL(url);
  },
};
