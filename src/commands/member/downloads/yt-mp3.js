const { PREFIX } = require(`${BASE_DIR}/config`);
const { download } = require(`${BASE_DIR}/services/spider-x-api`);
const { WarningError } = require(`${BASE_DIR}/errors`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "yt-mp3",
  description: "Mengunduh audio dari YouTube melalui link!",
  commands: ["yt-mp3", "youtube-mp3", "yt-audio", "youtube-audio", "mp3"],
  usage: `${PREFIX}yt-mp3 https://www.youtube.com/watch?v=mW8o_WDL91o`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    sendAudioFromURL,
    sendImageFromURL,
    fullArgs,
    sendWaitReact,
    sendSuccessReact,
    sendErrorReply,
  }) => {
    if (!fullArgs.length) {
      throw new InvalidParameterError("Anda perlu mengirim URL YouTube!");
    }

    await sendWaitReact();

    if (!fullArgs.includes("you")) {
      throw new WarningError("Link bukan dari YouTube!");
    }

    try {
      const data = await download("yt-mp3", fullArgs);

      if (!data) {
        await sendErrorReply("Tidak ada hasil yang ditemukan!");
        return;
      }

      await sendSuccessReact();

      await sendImageFromURL(
        data.thumbnail,
        `*Judul*: ${data.title}
        
*Deskripsi*: ${data.description}
*Durasi dalam detik*: ${data.total_duration_in_seconds}
*Kanal*: ${data.channel.name}`
      );

      await sendAudioFromURL(data.url);
    } catch (error) {
      console.log(error);
      await sendErrorReply(error.message);
    }
  },
};
