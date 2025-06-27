const { PREFIX } = require(`${BASE_DIR}/config`);
const { download } = require(`${BASE_DIR}/services/spider-x-api`);
const { WarningError } = require(`${BASE_DIR}/errors`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "yt-mp4",
  description: "Mengunduh video dari YouTube melalui link!",
  commands: ["yt-mp4", "youtube-mp4", "yt-video", "youtube-video", "mp4"],
  usage: `${PREFIX}yt-mp4 https://www.youtube.com/watch?v=mW8o_WDL91o`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    sendVideoFromURL,
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
      const data = await download("yt-mp4", fullArgs);

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

      await sendVideoFromURL(data.url);
    } catch (error) {
      console.log(error);
      await sendErrorReply(error.message);
    }
  },
};
