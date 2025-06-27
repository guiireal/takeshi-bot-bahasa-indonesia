const { PREFIX } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");

module.exports = {
  name: "send-text",
  description:
    "Contoh cara mengirim pesan teks sederhana dan dengan penyebutan",
  commands: ["send-text"],
  usage: `${PREFIX}send-text`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendText, sendReact, userJid }) => {
    await sendReact("💬");

    await delay(3000);

    await sendReply("Saya akan mendemonstrasikan berbagai cara mengirim teks");

    await delay(3000);

    await sendText("Ini adalah pesan teks sederhana menggunakan sendText");

    await delay(3000);

    await sendText(`Halo! Pesan ini menyebut Anda: @${userJid.split("@")[0]}`, [
      userJid,
    ]);

    await delay(3000);

    await sendReply("Ini adalah balasan menggunakan sendReply");

    await delay(3000);

    await sendText(
      "Anda bisa menggunakan *tebal*, _miring_, ~coret~ dan ```kode``` dalam teks!"
    );

    await delay(3000);

    await sendText(
      "📝 *Perbedaan antara fungsi:*\n\n" +
        "• `sendText()` - Mengirim teks sederhana, dengan opsi menyebut pengguna\n" +
        "• `sendReply()` - Mengirim teks sebagai balasan untuk pesan saat ini\n\n" +
        "Keduanya mendukung format WhatsApp!"
    );
  },
};
