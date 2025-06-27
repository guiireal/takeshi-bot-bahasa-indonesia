const { PREFIX } = require(`${BASE_DIR}/config`);
const { play } = require(`${BASE_DIR}/services/spider-x-api`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "play-video",
  description: "Mengunduh video",
  commands: ["play-video", "pv"],
  usage: `${PREFIX}play-video MC Hariel`,
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
      throw new InvalidParameterError(
        "Anda perlu memberitahu saya apa yang ingin dicari!"
      );
    }

    if (fullArgs.includes("http://") || fullArgs.includes("https://")) {
      throw new InvalidParameterError(
        `Anda tidak bisa menggunakan link untuk mengunduh video! Gunakan ${PREFIX}yt-mp4 link`
      );
    }

    await sendWaitReact();

    try {
      const data = await play("video", fullArgs);

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
      await sendErrorReply(JSON.stringify(error.message));
    }
  },
};
