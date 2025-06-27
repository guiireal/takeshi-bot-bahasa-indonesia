const { PREFIX } = require(`${BASE_DIR}/config`);
const { gemini } = require(`${BASE_DIR}/services/spider-x-api`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "gemini",
  description: "Gunakan kecerdasan buatan Google Gemini!",
  commands: ["gemini", "takeshi"],
  usage: `${PREFIX}gemini berapa batang kayu yang dibutuhkan untuk membuat kano?`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendSuccessReply, sendWaitReply, args }) => {
    const text = args[0];

    if (!text) {
      throw new InvalidParameterError(
        "Anda perlu memberitahu saya apa yang harus dijawab!"
      );
    }

    await sendWaitReply();

    const responseText = await gemini(text);

    await sendSuccessReply(responseText);
  },
};
