const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError, WarningError } = require(`${BASE_DIR}/errors`);
const { onlyNumbers } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "get-lid",
  description: "Mengembalikan LID dari kontak yang disebutkan.",
  commands: ["get-lid"],
  usage: `${PREFIX}get-lid @tandai atau +telepon`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ args, sendSuccessReply, socket }) => {
    if (!args.length) {
      throw new InvalidParameterError(
        "Anda harus menyebutkan seseorang atau memasukkan kontak!"
      );
    }

    const [result] = await socket.onWhatsApp(onlyNumbers(args[0]));

    if (!result) {
      throw new WarningError(
        "Nomor yang dimasukkan tidak terdaftar di WhatsApp!"
      );
    }

    const jid = result?.jid;
    const lid = result?.lid;

    await sendSuccessReply(`JID: ${jid}${lid ? `\nLID: ${lid}` : ""}`);
  },
};
