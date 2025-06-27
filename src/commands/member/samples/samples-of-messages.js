const { PREFIX } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");

module.exports = {
  name: "samples-of-messages",
  description:
    "Daftar semua contoh yang tersedia untuk pengiriman pesan bagi pengembang",
  commands: ["samples-of-messages", "sample-of-messages"],
  usage: `${PREFIX}samples-of-messages`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendReact }) => {
    await sendReact("📚");

    await delay(2000);

    await sendReply(
      "*📚 CONTOH YANG TERSEDIA*\n\n" +
        "Gunakan perintah di bawah ini untuk melihat contoh praktis cara menggunakan perintah saya:"
    );

    await delay(2000);

    await sendReply(
      "*🔊 AUDIO:*\n" +
        `• \`${PREFIX}send-audio-from-file\` - Kirim audio dari file lokal\n` +
        `• \`${PREFIX}send-audio-from-url\` - Kirim audio dari URL\n` +
        `• \`${PREFIX}send-audio-from-buffer\` - Kirim audio dari buffer`
    );

    await delay(2000);

    await sendReply(
      "*🖼️ GAMBAR:*\n" +
        `• \`${PREFIX}send-image-from-file\` - Kirim gambar dari file lokal\n` +
        `• \`${PREFIX}send-image-from-url\` - Kirim gambar dari URL\n` +
        `• \`${PREFIX}send-image-from-buffer\` - Kirim gambar dari buffer`
    );

    await delay(2000);

    await sendReply(
      "*🎬 VIDEO:*\n" +
        `• \`${PREFIX}send-video-from-file\` - Kirim video dari file lokal\n` +
        `• \`${PREFIX}send-video-from-url\` - Kirim video dari URL\n` +
        `• \`${PREFIX}send-video-from-buffer\` - Kirim video dari buffer`
    );

    await delay(2000);

    await sendReply(
      "*🎞️ GIF:*\n" +
        `• \`${PREFIX}send-gif-from-file\` - Kirim GIF dari file lokal\n` +
        `• \`${PREFIX}send-gif-from-url\` - Kirim GIF dari URL\n` +
        `• \`${PREFIX}send-gif-from-buffer\` - Kirim GIF dari buffer`
    );

    await delay(2000);

    await sendReply(
      "*🏷️ STIKER:*\n" +
        `• \`${PREFIX}send-sticker-from-file\` - Kirim stiker dari file lokal\n` +
        `• \`${PREFIX}send-sticker-from-url\` - Kirim stiker dari URL\n` +
        `• \`${PREFIX}send-sticker-from-buffer\` - Kirim stiker dari buffer`
    );

    await delay(2000);

    await sendReply(
      "*📊 POLLING:*\n" +
        `• \`${PREFIX}send-poll\` - Kirim polling/pemungutan suara (pilihan tunggal atau ganda)`
    );

    await delay(2000);

    await sendReply(
      "*📄 DOKUMEN:*\n" +
        `• \`${PREFIX}send-document-from-file\` - Kirim dokumen dari file lokal\n` +
        `• \`${PREFIX}send-document-from-url\` - Kirim dokumen dari URL\n` +
        `• \`${PREFIX}send-document-from-buffer\` - Kirim dokumen dari buffer`
    );

    await delay(2000);

    await sendReply(
      "*💬 TEKS DAN BALASAN:*\n" +
        `• \`${PREFIX}send-text\` - Kirim teks (dengan/tanpa penyebutan)\n` +
        `• \`${PREFIX}send-quoted\` - Balas pesan (dengan/tanpa penyebutan)\n` +
        `• \`${PREFIX}send-reaction\` - Kirim reaksi (emoji)`
    );

    await delay(2000);

    await sendReply(
      "*📊 DATA DAN METADATA:*\n" +
        `• \`${PREFIX}get-group-data\` - Dapatkan data grup (nama, pemilik, peserta)\n` +
        `• \`${PREFIX}get-message-data\` - Dapatkan metadata pesan\n` +
        `• \`${PREFIX}group-functions\` - Fungsi utilitas grup (demonstrasi)\n` +
        `• \`${PREFIX}raw-message\` - Dapatkan data mentah pesan`
    );

    await delay(2000);

    await sendReply(
      "*🎯 CARA MENGGUNAKAN:*\n\n" +
        "1️⃣ Jalankan perintah apa pun dari daftar di atas\n" +
        "2️⃣ Amati perilaku praktisnya\n" +
        "3️⃣ Tinjau kode sumber di `/src/commands/member/exemplos/`\n" +
        "4️⃣ Gunakan sebagai dasar untuk perintah Anda sendiri\n\n" +
        "*💡 Tips:* Semua contoh menyertakan penjelasan detail dan kasus penggunaan!"
    );

    await delay(2000);

    await sendReply(
      "*📝 FUNGSI YANG TERSEDIA:*\n\n" +
        "Lihat file `@types/index.d.ts` untuk dokumentasi lengkap semua fungsi yang tersedia dengan contoh kode!"
    );
  },
};
