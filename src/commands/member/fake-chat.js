/**
 * Dikembangkan oleh: Mkg
 * Diperbaiki oleh: Dev Gui
 *
 * @author Dev Gui
 */
const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const { toUserJid } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "fake-chat",
  description: "Membuat kutipan palsu dengan menyebutkan pengguna",
  commands: ["fake-chat", "fq", "fake-quote", "f-quote", "fk"],
  usage: `${PREFIX}fake-chat @pengguna / teks yang dikutip / pesan yang akan dikirim`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ remoteJid, socket, args }) => {
    if (args.length !== 3) {
      throw new InvalidParameterError(
        `Penggunaan perintah salah. Contoh: ${PREFIX}fake-chat @pengguna / teks yang dikutip / pesan yang akan dikirim`
      );
    }

    const quotedText = args[1];
    const responseText = args[2];

    const mentionedJid = toUserJid(args[0]);

    if (quotedText.length < 2) {
      throw new InvalidParameterError(
        "Teks yang dikutip harus memiliki setidaknya 2 karakter."
      );
    }

    if (responseText.length < 2) {
      throw new InvalidParameterError(
        "Pesan balasan harus memiliki setidaknya 2 karakter."
      );
    }

    const fakeQuoted = {
      key: {
        fromMe: false,
        participant: mentionedJid,
        remoteJid,
      },
      message: {
        extendedTextMessage: {
          text: quotedText,
          contextInfo: {
            mentionedJid: [mentionedJid],
          },
        },
      },
    };

    await socket.sendMessage(
      remoteJid,
      { text: responseText },
      { quoted: fakeQuoted }
    );
  },
};
