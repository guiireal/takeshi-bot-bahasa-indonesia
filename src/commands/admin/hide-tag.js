const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "hide-tag",
  description: "Perintah ini akan menandai semua anggota grup",
  commands: ["hide-tag", "to-tag"],
  usage: `${PREFIX}hidetag alasan`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ fullArgs, sendText, socket, remoteJid, sendReact }) => {
    const { participants } = await socket.groupMetadata(remoteJid);

    const mentions = participants.map(({ id }) => id);

    await sendReact("📢");

    await sendText(`📢 Menandai semua!\n\n${fullArgs}`, mentions);
  },
};
