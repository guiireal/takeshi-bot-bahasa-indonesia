const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");
const path = require("node:path");
const fs = require("node:fs");
const { getBuffer } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "send-document-from-buffer",
  description: "Contoh cara mengirim dokumen dari buffer",
  commands: ["send-document-from-buffer"],
  usage: `${PREFIX}send-document-from-buffer`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendReact, socket, remoteJid, webMessage }) => {
    await sendReact("📄");

    await delay(3000);

    await sendReply(
      "Saya akan mengirim dokumen dari buffer (file lokal dan URL)"
    );

    await delay(3000);

    const fileBuffer = fs.readFileSync(
      path.join(ASSETS_DIR, "samples", "sample-document.pdf")
    );

    await socket.sendMessage(
      remoteJid,
      {
        document: fileBuffer,
        mimetype: "application/pdf",
        fileName: "dokumen-dari-buffer-lokal.pdf",
      },
      { quoted: webMessage }
    );

    await delay(3000);

    await sendReply("Sekarang saya akan mengirim dokumen dari buffer URL");

    await delay(3000);

    const urlBuffer = await getBuffer(
      "https://api.spiderx.com.br/storage/samples/sample-text.txt"
    );

    await socket.sendMessage(
      remoteJid,
      {
        document: urlBuffer,
        mimetype: "text/plain",
        fileName: "file-dari-buffer-url.txt",
      },
      { quoted: webMessage }
    );

    await delay(3000);

    await sendReply(
      "Anda juga bisa mengirim dokumen buffer dengan mimetype default:"
    );

    await delay(3000);

    await socket.sendMessage(
      remoteJid,
      {
        document: fileBuffer,
        fileName: "dokumen-buffer-default.pdf",
      },
      { quoted: webMessage }
    );

    await delay(3000);

    await sendReply(
      "Untuk mengirim dokumen dari buffer, gunakan socket.sendMessage() secara langsung dengan buffer.\n\n" +
        "Ini berguna saat Anda memiliki dokumen yang diproses dalam memori atau perlu memanipulasi file sebelum mengirim."
    );

    await delay(3000);

    await sendReply(
      "💡 *Tips:* Buffer berguna untuk dokumen yang dibuat secara dinamis atau saat Anda perlu memproses file sebelum pengiriman."
    );
  },
};
