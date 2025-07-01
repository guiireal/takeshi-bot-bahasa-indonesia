const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "delete",
  description: "Saya menghapus pesan",
  commands: ["delete", "d"],
  usage: `${PREFIX}delete (menyebutkan sebuah pesan)`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ deleteMessage, webMessage, remoteJid }) => {
    const { stanzaId, participant } =
      webMessage?.message?.extendedTextMessage?.contextInfo;

    if (!stanzaId || !participant) {
      throw new InvalidParameterError(
        "Anda harus menyebutkan pesan untuk menghapus!"
      );
    }

    await deleteMessage({
      remoteJid,
      fromMe: false,
      id: stanzaId,
      participant,
    });
  },
};
