const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError, WarningError } = require(`${BASE_DIR}/errors`);

const { search } = require(`${BASE_DIR}/services/spider-x-api`);

module.exports = {
  name: "yt-search",
  description: "Mencari di YouTube",
  commands: ["yt-search", "Youtube"],
  usage: `${PREFIX}yt-search MC Hariel`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ fullArgs, sendSuccessReply }) => {
    if (fullArgs.length <= 1) {
      throw new InvalidParameterError(
        "Anda perlu memberikan kata kunci pencarian untuk YouTube."
      );
    }

    const maxLength = 100;

    if (fullArgs.length > maxLength) {
      throw new InvalidParameterError(
        `Panjang maksimal pencarian adalah ${maxLength} karakter.`
      );
    }

    const data = await search("youtube", fullArgs);

    if (!data) {
      throw new WarningError("Tidak dapat menemukan hasil untuk pencarian.");
    }

    let text = "";

    for (const item of data) {
      text += `Judul: *${item.title}*\n\n`;
      text += `Durasi: ${item.duration}\n\n`;
      text += `Dipublikasikan: ${item.published_at}\n\n`;
      text += `Tayangan: ${item.views}\n\n`;
      text += `URL: ${item.url}\n\n-----\n\n`;
    }

    text = text.slice(0, -2);

    await sendSuccessReply(`*Pencarian selesai*

*Kata kunci*: ${fullArgs}
      
*Hasil*
${text}`);
  },
};
