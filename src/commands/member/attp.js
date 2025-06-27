const { PREFIX } = require(`${BASE_DIR}/config`);
const { attp } = require(`${BASE_DIR}/services/spider-x-api`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "attp",
  description: "Membuat stiker teks animasi.",
  commands: ["attp"],
  usage: `${PREFIX}attp percobaan`,
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

    const url = await attp(args[0].trim());

    await sendSuccessReact();

    await sendStickerFromURL(url);
  },
};
