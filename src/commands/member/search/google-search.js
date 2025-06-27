const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError, WarningError } = require(`${BASE_DIR}/errors`);

const { search } = require(`${BASE_DIR}/services/spider-x-api`);

module.exports = {
  name: "google-search",
  description: "Mencari di Google",
  commands: ["google-search", "g-search"],
  usage: `${PREFIX}google-search perang dunia kedua`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ fullArgs, sendSuccessReply }) => {
    if (fullArgs.length <= 1) {
      throw new InvalidParameterError(
        "Anda perlu memberikan kata kunci pencarian untuk Google."
      );
    }

    const maxLength = 100;

    if (fullArgs.length > maxLength) {
      throw new InvalidParameterError(
        `Panjang maksimal pencarian adalah ${maxLength} karakter.`
      );
    }

    const data = await search("google", fullArgs);

    if (!data) {
      throw new WarningError("Tidak dapat menemukan hasil untuk pencarian.");
    }

    let text = "";

    for (const item of data) {
      text += `Judul: *${item.title}*\n\n`;
      text += `Deskripsi: ${item.description}\n\n`;
      text += `URL: ${item.url}\n\n-----\n\n`;
    }

    text = text.slice(0, -2);

    await sendSuccessReply(`*Pencarian selesai*

*Kata kunci*: ${fullArgs}
      
*Hasil*
${text}`);
  },
};
