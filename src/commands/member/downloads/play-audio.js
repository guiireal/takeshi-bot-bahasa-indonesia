const { PREFIX } = require(`${BASE_DIR}/config`);
const { play } = require(`${BASE_DIR}/services/spider-x-api`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "play-audio",
  description: "Mengunduh musik",
  commands: ["play-audio", "play", "pa"],
  usage: `${PREFIX}play-audio MC Hariel`,
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
      throw new InvalidParameterError(
        "Anda perlu memberitahu saya apa yang ingin dicari!"
      );
    }

    if (fullArgs.includes("http://") || fullArgs.includes("https://")) {
      throw new InvalidParameterError(
        `Anda tidak bisa menggunakan link untuk mengunduh musik! Gunakan ${PREFIX}yt-mp3 link`
      );
    }

    await sendWaitReact();

    try {
      const data = await play("audio", fullArgs);

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
