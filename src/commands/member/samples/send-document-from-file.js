const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");
const path = require("node:path");

module.exports = {
  name: "send-document-from-file",
  description: "Contoh cara mengirim dokumen dari file lokal",
  commands: ["send-document-from-file"],
  usage: `${PREFIX}send-document-from-file`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendDocumentFromFile, sendReact }) => {
    await sendReact("📄");

    await delay(3000);

    await sendReply(
      "Saya akan mengirim berbagai jenis dokumen dari file lokal"
    );

    await delay(3000);

    await sendDocumentFromFile(
      path.join(ASSETS_DIR, "samples", "sample-document.pdf"),
      "application/pdf",
      "dokumen-contoh.pdf"
    );

    await delay(3000);

    await sendDocumentFromFile(
      path.join(ASSETS_DIR, "samples", "sample-text.txt"),
      "text/plain",
      "file-teks-contoh.txt"
    );

    await delay(3000);

    await sendDocumentFromFile(
      path.join(ASSETS_DIR, "samples", "sample-document.txt"),
      "text/plain",
      "dokumen-lain.txt"
    );

    await delay(3000);

    await sendReply("Anda juga bisa mengirim dokumen dengan mimetype default:");

    await delay(3000);

    await sendDocumentFromFile(
      path.join(ASSETS_DIR, "samples", "sample-document.pdf")
    );

    await delay(3000);

    await sendReply(
      "Untuk mengirim dokumen dari file, gunakan fungsi sendDocumentFromFile(filePath, mimetype, fileName).\n\n" +
        "Ini berguna saat Anda memiliki dokumen yang disimpan secara lokal di server."
    );

    await delay(3000);

    await sendReply(
      "💡 *Tips:* Anda bisa menentukan mimetype untuk berbagai jenis: PDF, TXT, DOC, XLS, dll."
    );
  },
};
