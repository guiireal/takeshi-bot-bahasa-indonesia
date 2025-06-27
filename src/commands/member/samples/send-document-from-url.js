const { PREFIX } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");

module.exports = {
  name: "send-document-from-url",
  description: "Contoh cara mengirim dokumen dari URL",
  commands: ["send-document-from-url"],
  usage: `${PREFIX}send-document-from-url`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendDocumentFromURL, sendReact }) => {
    await sendReact("📄");

    await delay(3000);

    await sendReply("Saya akan mengirim berbagai jenis dokumen dari URL");

    await delay(3000);

    await sendDocumentFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-document.pdf",
      "application/pdf",
      "dokumen-pdf-dari-url.pdf"
    );

    await delay(3000);

    await sendDocumentFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-text.txt",
      "text/plain",
      "file-teks-dari-url.txt"
    );

    await delay(3000);

    await sendDocumentFromURL(
      "https://raw.githubusercontent.com/guiireal/takeshi-bot-espanol/refs/heads/main/README.md",
      "text/markdown",
      "readme-contoh.md"
    );

    await delay(3000);

    await sendReply("Anda juga bisa mengirim dokumen dengan mimetype default:");

    await delay(3000);

    await sendDocumentFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-document.pdf"
    );

    await delay(3000);

    await sendReply(
      "Untuk mengirim dokumen dari URL, gunakan fungsi sendDocumentFromURL(url, mimetype, fileName).\n\n" +
        "Ini berguna saat Anda memiliki dokumen yang di-host online atau diperoleh dari API."
    );

    await delay(3000);

    await sendReply(
      "💡 *Tips:* Pastikan URL mengarah ke file yang valid dan dapat diakses."
    );
  },
};
