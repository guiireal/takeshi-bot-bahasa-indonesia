const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");
const path = require("node:path");
const fs = require("node:fs");
const { getBuffer } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "send-image-from-buffer",
  description: "Contoh cara mengirim gambar dari buffer",
  commands: ["send-image-from-buffer"],
  usage: `${PREFIX}send-image-from-buffer`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendImageFromBuffer, sendReact, userJid }) => {
    await sendReact("🖼️");

    await delay(3000);

    await sendReply("Saya akan mengirim gambar dari buffer file lokal");

    await delay(3000);

    const imageBuffer = fs.readFileSync(
      path.join(ASSETS_DIR, "samples", "sample-image.jpg")
    );

    await sendImageFromBuffer(
      imageBuffer,
      "Ini adalah gambar dari buffer file lokal"
    );

    await delay(3000);

    await sendReply("Sekarang saya akan mengirim gambar dari buffer URL");

    await delay(3000);

    const urlBuffer = await getBuffer(
      "https://api.spiderx.com.br/storage/samples/sample-image.jpg"
    );

    await sendImageFromBuffer(urlBuffer, "Ini adalah gambar dari buffer URL");

    await delay(3000);

    await sendReply("Anda juga bisa mengirim gambar buffer tanpa keterangan");

    await delay(3000);

    await sendImageFromBuffer(urlBuffer);

    await delay(3000);

    await sendReply(
      "Sekarang saya akan mengirim gambar buffer dengan menyebut Anda:"
    );

    await delay(3000);

    await sendImageFromBuffer(
      urlBuffer,
      `Ini gambar untuk Anda @${userJid.split("@")[0]}!`,
      [userJid]
    );

    await delay(3000);

    await sendReply(
      "Untuk mengirim gambar dari buffer, gunakan fungsi sendImageFromBuffer(buffer, caption, [mentions], quoted).\n\n" +
        "Ini berguna saat Anda memiliki gambar yang diproses dalam memori atau perlu memanipulasi gambar sebelum mengirim."
    );
  },
};
