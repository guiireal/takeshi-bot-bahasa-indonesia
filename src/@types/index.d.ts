declare global {
  /** Jalur dasar proyek, digunakan untuk imports. */
  const BASE_DIR: string;

  /**
   * Properti dan fungsi yang tersedia di objek yang diteruskan ke fungsi handle
   * dari setiap perintah. Anda dapat mengaksesnya dengan destructuring:
   *
   * ```javascript
   * handle: async ({ args, sendReply, isImage }) => {
   * // Kode Anda di sini
   * }
   * ```
   */
  interface CommandHandleProps {
    /**
     * Argumen yang diteruskan bersama perintah sebagai array, yang memisahkan
     * argumen adalah garis miring / | atau \
     * Contoh: ["arg1", "arg2"]
     */
    args: string[];

    /**
     * Nama perintah yang dieksekusi
     */
    commandName: string;

    /**
     * Argumen yang diteruskan bersama perintah sebagai string tunggal.
     * Contoh: "arg1 / arg2"
     */
    fullArgs: string;

    /**
     * Pesan lengkap termasuk perintah.
     */
    fullMessage: string;

    /**
     * Jika pesan berasal dari grup.
     */
    isGroup: boolean;

    /**
     * Jika pesan berasal dari grup yang pesertanya memiliki LID.
     */
    isGroupWithLid: boolean;

    /**
     * Jika pesan adalah gambar.
     */
    isImage: boolean;

    /**
     * Jika pesan adalah balasan ke pesan lain.
     */
    isReply: boolean;

    /**
     * Jika pesan adalah stiker.
     */
    isSticker: boolean;

    /**
     * Jika pesan adalah video.
     */
    isVideo: boolean;

    /**
     * Prefix bot yang dikonfigurasi.
     */
    prefix: string;

    /**
     * ID grup/pengguna yang menerima pesan.
     */
    remoteJid: string;

    /**
     * ID pesan yang sedang dibalas.
     */
    replyJid: string;

    /**
     * Socket Baileys untuk operasi lanjutan.
     */
    socket: any;

    /**
     * Timestamp saat perintah dimulai.
     */
    startProcess: number;

    /**
     * Jenis perintah berdasarkan peran, jika "admin", "owner" atau "member".
     */
    type: string;

    /**
     * ID pengguna yang mengirim pesan.
     */
    userJid: string;

    /**
     * Informasi detail pesan WhatsApp.
     */
    webMessage: any;

    /**
     * Menghapus pesan dari peserta WhatsApp.
     * Perlu menjadi admin grup untuk menghapus pesan peserta lain.
     *
     * Contoh:
     * ```javascript
     * await deleteMessage(webMessage.key);
     * ```
     * @param key Kunci identifikasi pesan yang akan dihapus.
     */
    deleteMessage(key: {
      remoteJid: string;
      fromMe: boolean;
      id: string;
      participant: string;
    }): Promise<void>;

    /**
     * Mengunduh gambar dari pesan saat ini.
     * @returns Promise dengan path gambar
     */
    downloadImage(): Promise<string>;

    /**
     * Mengunduh stiker dari pesan saat ini.
     * @returns Promise dengan path stiker
     */
    downloadSticker(): Promise<string>;

    /**
     * Mengunduh video dari pesan saat ini.
     * @returns Promise dengan path video
     */
    downloadVideo(): Promise<string>;

    /**
     * Mengirim audio dari file.
     *
     * Contoh:
     * ```javascript
     * const { ASSETS_DIR } = require(`${BASE_DIR}/src/config`);
     * const path = require("node:path");
     *
     * const filePath = path.join(ASSETS_DIR, "samples" "sample-audio.mp3");
     * await sendAudioFromFile(filePath);
     * ```
     * @param filePath Path file
     * @param asVoice Jika audio harus dikirim sebagai pesan suara (true atau false)
     * @param quoted Jika pesan harus dikirim menyebutkan pesan lain (true atau false)
     */
    sendAudioFromFile(
      filePath: string,
      asVoice: boolean,
      quoted: boolean
    ): Promise<void>;

    /**
     * Mengirim audio dari file.
     *
     * Contoh:
     * ```javascript
     * const { ASSETS_DIR } = require(`${BASE_DIR}/src/config`);
     * const { getBuffer } = require(`${BASE_DIR}/src/utils`);
     * const path = require("node:path");
     * const fs = require("node:fs");
     *
     * const buffer = fs.readFileSync(path.join(ASSETS_DIR, "samples" "sample-audio.mp3"))
     * atau
     * const buffer = await getBuffer("[https://contoh.com/audio.mp3](https://contoh.com/audio.mp3)");
     * await sendAudioFromBuffer(filePath);
     * ```
     * @param buffer Buffer file audio
     * @param asVoice Jika audio harus dikirim sebagai pesan suara (true atau false)
     * @param quoted Jika pesan harus dikirim menyebutkan pesan lain (true atau false)
     */
    sendAudioFromBuffer(
      buffer: Buffer,
      asVoice: boolean,
      quoted: boolean
    ): Promise<void>;

    /**
     * Mengirim audio dari URL.
     *
     * Contoh:
     * ```javascript
     * await sendAudioFromURL("[https://contoh.com/audio.mp3](https://contoh.com/audio.mp3)");
     * ```
     * @param url URL audio yang akan dikirim
     * @param asVoice Jika audio harus dikirim sebagai pesan suara (true atau false)
     * @param quoted Jika pesan harus dikirim menyebutkan pesan lain (true atau false)
     */
    sendAudioFromURL(
      url: string,
      asVoice: boolean,
      quoted: boolean
    ): Promise<void>;

    /**
     * Mengirim gif dari file lokal.
     *
     * Contoh:
     * ```javascript
     * await sendGifFromFile("./assets/sesuatu.gif", "Ini gif Anda @5511920202020!", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param file Path file di server
     * @param caption Teks pesan (opsional)
     * @param mentions Array opsional JID pengguna untuk disebutkan
     * @param quoted Jika pesan harus dikirim menyebutkan pesan lain (true atau false)
     */
    sendGifFromFile(
      file: string,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<void>;

    /**
     * Mengirim gif dari URL.
     *
     * Contoh:
     * ```javascript
     * await sendGifFromURL("[https://contoh.com/video.gif](https://contoh.com/video.gif)", "Ini gif Anda @5511920202020!", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param url URL gif yang akan dikirim
     * @param caption Teks pesan (opsional)
     * @param mentions Array opsional JID pengguna untuk disebutkan
     * @param quoted Jika pesan harus dikirim menyebutkan pesan lain (true atau false)
     */
    sendGifFromURL(
      url: string,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<void>;

    /**
     * Mengirim gif dari buffer.
     *
     * Contoh:
     * ```javascript
     * const { ASSETS_DIR } = require(`${BASE_DIR}/config`);
     * const { getBuffer } = require(`${BASE_DIR}/utils`);
     * const path = require("node:path");
     * const fs = require("node:fs");
     *
     * const buffer = fs.readFileSync(path.join(ASSETS_DIR, "samples", "sample-video.mp4"));
     * atau
     * const buffer = await getBuffer("[https://contoh.com/video.gif](https://contoh.com/video.gif)");
     * await sendGifFromBuffer(buffer, "Ini gif Anda @5511920202020!", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param buffer Buffer gif
     * @param caption Teks pesan (opsional)
     * @param mentions Array opsional JID pengguna untuk disebutkan
     * @param quoted Jika pesan harus dikirim menyebutkan pesan lain (true atau false)
     */
    sendGifFromBuffer(
      buffer: Buffer,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<void>;

    /**
     * Mengirim gambar dari file lokal.
     *
     * Contoh:
     * ```javascript
     * await sendImageFromFile("./assets/image.png", "Ini gambar Anda @5511920202020!", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param file Path file di server
     * @param caption Teks pesan (opsional)
     * @param mentions Array opsional JID pengguna untuk disebutkan
     * @param quoted Jika pesan harus dikirim menyebutkan pesan lain (true atau false)
     */
    sendImageFromFile(
      file: string,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<void>;

    /**
     * Mengirim gambar dari buffer.
     *
     * Contoh:
     * ```javascript
     * const fs = require("node:fs");
     * const { getBuffer } = require(`${BASE_DIR}/utils`);
     *
     * const buffer = fs.readFileSync("./assets/image.png");
     * atau
     * const buffer = await getBuffer("[https://contoh.com/gambar.png](https://contoh.com/gambar.png)");
     * await sendImageFromBuffer(buffer, "Ini gambar Anda @5511920202020!", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param buffer Buffer gambar
     * @param caption Teks pesan (opsional)
     * @param mentions Array opsional JID pengguna untuk disebutkan
     * @param quoted Jika pesan harus dikirim menyebutkan pesan lain (true atau false)
     */
    sendImageFromBuffer(
      buffer: Buffer,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<void>;

    /**
     * Mengirim gambar dari URL.
     *
     * Contoh:
     * ```javascript
     * await sendImageFromURL("[https://contoh.com/gambar.png](https://contoh.com/gambar.png)", "Ini gambar Anda @5511920202020!", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param url URL gambar yang akan dikirim
     * @param caption Teks pesan (opsional)
     * @param mentions Array opsional JID pengguna untuk disebutkan
     * @param quoted Jika pesan harus dikirim menyebutkan pesan lain (true atau false)
     */
    sendImageFromURL(
      url: string,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<void>;

    /**
     * Mengirim reaksi (emoji) pada pesan.
     *
     * Contoh:
     * ```javascript
     * await sendReact("👍");
     * ```
     * @param emoji Emoji untuk bereaksi
     */
    sendReact(emoji: string): Promise<void>;

    /**
     * Mensimulasikan aksi perekaman audio, mengirim pesan status.
     *
     * @param anotherJid ID grup/pengguna lain untuk mengirim status (opsional)
     */
    sendRecordState(anotherJid?: string): Promise<void>;

    /**
     * Mengirim reaksi sukses (emoji ✅) pada pesan.
     */
    sendSuccessReact(): Promise<void>;

    /**
     * Mensimulasikan aksi pengetikan, mengirim pesan status.
     *
     * @param anotherJid ID grup/pengguna lain untuk mengirim status (opsional)
     */
    sendTypingState(anotherJid?: string): Promise<void>;

    /**
     * Mengirim reaksi tunggu (emoji ⏳) pada pesan.
     */
    sendWaitReact(): Promise<void>;

    /**
     * Mengirim reaksi peringatan (emoji ⚠️) pada pesan.
     */
    sendWarningReact(): Promise<void>;

    /**
     * Mengirim reaksi error (emoji ❌) pada pesan.
     */
    sendErrorReact(): Promise<void>;

    /**
     * Mengirim pesan sebagai balasan.
     *
     * Contoh:
     * ```javascript
     * await sendReply("Ini balasan Anda!", [mentions]);
     * ```
     * @param text Teks pesan
     * @param mentions Array opsional ID pengguna untuk disebutkan
     */
    sendReply(text: string, mentions?: string[]): Promise<void>;

    /**
     * Mengirim pesan sukses sebagai balasan.
     *
     * Contoh:
     * ```javascript
     * await sendSuccessReply("Operasi berhasil diselesaikan!");
     * ```
     * @param text Teks pesan sukses
     * @param mentions Array opsional ID pengguna untuk disebutkan
     */
    sendSuccessReply(text: string, mentions?: string[]): Promise<void>;

    /**
     * Mengirim pesan peringatan sebagai balasan.
     *
     * Contoh:
     * ```javascript
     * await sendWarningReply("Perhatian! Ada yang tidak beres.");
     * ```
     * @param text Teks pesan error
     * @param mentions Array opsional ID pengguna untuk disebutkan
     */
    sendWarningReply(text: string, mentions?: string[]): Promise<void>;

    /**
     * Mengirim pesan tunggu sebagai balasan.
     *
     * Contoh:
     * ```javascript
     * await sendWaitReply("Tunggu, saya sedang memproses permintaan Anda...");
     * ```
     * @param text Teks pesan error
     * @param mentions Array opsional ID pengguna untuk disebutkan
     */
    sendWaitReply(text: string, mentions?: string[]): Promise<void>;

    /**
     * Mengirim pesan error sebagai balasan.
     *
     * Contoh:
     * ```javascript
     * await sendErrorReply("Tidak dapat menemukan hasil!");
     * ```
     * @param text Teks pesan error
     * @param mentions Array opsional ID pengguna untuk disebutkan
     */
    sendErrorReply(text: string, mentions?: string[]): Promise<void>;

    /**
     * Mengirim stiker dari file lokal.
     *
     * Contoh:
     * ```javascript
     * await sendStickerFromFile("./assets/sticker.webp");
     * ```
     * @param path Path file di server
     * @param quoted Jika pesan harus dikirim menyebutkan pesan lain (true atau false)
     */
    sendStickerFromFile(path: string, quoted?: boolean): Promise<void>;

    /**
     * Mengirim stiker dari URL.
     *
     * Contoh:
     * ```javascript
     * await sendStickerFromURL("[https://contoh.com/sticker.webp](https://contoh.com/sticker.webp)");
     * ```
     * @param url URL stiker yang akan dikirim
     * @param quoted Jika pesan harus dikirim menyebutkan pesan lain (true atau false)
     */
    sendStickerFromURL(url: string, quoted?: boolean): Promise<void>;

    /**
     * Mengirim stiker dari buffer.
     *
     * Contoh:
     * ```javascript
     * const { ASSETS_DIR } = require(`${BASE_DIR}/config`);
     * const { getBuffer } = require(`${BASE_DIR}/utils`);
     * const path = require("node:path");
     * const fs = require("node:fs");
     *
     * const buffer = fs.readFileSync(path.join(ASSETS_DIR, "samples", "sample-sticker.webp"));
     * atau
     * const buffer = await getBuffer("[https://contoh.com/sticker.webp](https://contoh.com/sticker.webp)");
     * await sendStickerFromBuffer(buffer);
     * ```
     * @param buffer Buffer stiker
     * @param quoted Jika pesan harus dikirim menyebutkan pesan lain (true atau false)
     */
    sendStickerFromBuffer(buffer: Buffer, quoted?: boolean): Promise<void>;

    /**
     * Mengirim pesan teks, opsional menyebutkan pengguna.
     *
     * Contoh:
     * ```javascript
     * await sendText("Halo @pengguna!", ["123456789@s.whatsapp.net"]);
     * ```
     * @param text Teks pesan
     * @param mentions Array opsional ID pengguna untuk disebutkan
     */
    sendText(text: string, mentions?: string[]): Promise<void>;

    /**
     * Mengirim video dari file lokal.
     *
     * Contoh:
     * ```javascript
     * await sendVideoFromFile("./assets/video.mp4", "Ini video Anda!", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param file Path file di server
     * @param caption Teks pesan (opsional)
     * @param mentions Array opsional JID pengguna untuk disebutkan
     * @param quoted Jika pesan harus dikirim menyebutkan pesan lain (true atau false)
     */
    sendVideoFromFile(
      file: string,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<void>;

    /**
     * Mengirim video dari URL.
     *
     * Contoh:
     * ```javascript
     * await sendVideoFromURL("[https://contoh.com/video.mp4](https://contoh.com/video.mp4)", "Ini video Anda @5511920202020!", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param url URL video yang akan dikirim
     * @param caption Teks pesan (opsional)
     * @param mentions Array opsional JID pengguna untuk disebutkan
     * @param quoted Jika pesan harus dikirim menyebutkan pesan lain (true atau false)
     */
    sendVideoFromURL(
      url: string,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<void>;

    /**
     * Mengirim video dari buffer.
     *
     * Contoh:
     * ```javascript
     * const { ASSETS_DIR } = require(`${BASE_DIR}/config`);
     * const { getBuffer } = require(`${BASE_DIR}/utils`);
     * const path = require("node:path");
     * const fs = require("node:fs");
     *
     * const buffer = fs.readFileSync(path.join(ASSETS_DIR, "samples", "sample-video.mp4"));
     * atau
     * const buffer = await getBuffer("[https://contoh.com/video.mp4](https://contoh.com/video.mp4)");
     * await sendVideoFromBuffer(buffer, "Ini video @5511920202020!", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param buffer Buffer video
     * @param caption Teks pesan (opsional)
     * @param mentions Array opsional JID pengguna untuk disebutkan
     * @param quoted Jika pesan harus dikirim menyebutkan pesan lain (true atau false)
     */
    sendVideoFromBuffer(
      buffer: Buffer,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<void>;

    /**
     * Mengirim dokumen dari file lokal.
     *
     * Contoh:
     * ```javascript
     * const { ASSETS_DIR } = require(`${BASE_DIR}/config`);
     * const path = require("node:path");
     *
     * const filePath = path.join(ASSETS_DIR, "samples", "sample-document.pdf");
     * await sendDocumentFromFile(filePath, "application/pdf", "dokumen.pdf");
     * ```
     * @param filePath Path file
     * @param mimetype Tipe MIME dokumen (mis: "application/pdf", "text/plain")
     * @param fileName Nama file yang akan ditampilkan di WhatsApp
     * @param quoted Jika pesan harus dikirim menyebutkan pesan lain (true atau false)
     */
    sendDocumentFromFile(
      filePath: string,
      mimetype?: string,
      fileName?: string,
      quoted?: boolean
    ): Promise<void>;

    /**
     * Mengirim dokumen dari URL.
     *
     * Contoh:
     * ```javascript
     * await sendDocumentFromURL("[https://contoh.com/dokumen.pdf](https://contoh.com/dokumen.pdf)", "application/pdf", "dokumen.pdf");
     * ```
     * @param url URL dokumen yang akan dikirim
     * @param mimetype Tipe MIME dokumen (mis: "application/pdf", "text/plain")
     * @param fileName Nama file yang akan ditampilkan di WhatsApp
     * @param quoted Jika pesan harus dikirim menyebutkan pesan lain (true atau false)
     */
    sendDocumentFromURL(
      url: string,
      mimetype?: string,
      fileName?: string,
      quoted?: boolean
    ): Promise<void>;

    /**
     * Mengirim dokumen dari buffer.
     *
     * Contoh:
     * ```javascript
     * const { ASSETS_DIR } = require(`${BASE_DIR}/config`);
     * const { getBuffer } = require(`${BASE_DIR}/utils`);
     * const path = require("node:path");
     * const fs = require("node:fs");
     *
     * const buffer = fs.readFileSync(path.join(ASSETS_DIR, "samples", "sample-document.pdf"));
     * atau
     * const buffer = await getBuffer("[https://contoh.com/dokumen.pdf](https://contoh.com/dokumen.pdf)");
     * await sendDocumentFromBuffer(buffer, "application/pdf", "dokumen.pdf");
     * ```
     * @param buffer Buffer dokumen
     * @param mimetype Tipe MIME dokumen (mis: "application/pdf", "text/plain")
     * @param fileName Nama file yang akan ditampilkan di WhatsApp
     * @param quoted Jika pesan harus dikirim menyebutkan pesan lain (true atau false)
     */
    sendDocumentFromBuffer(
      buffer: Buffer,
      mimetype?: string,
      fileName?: string,
      quoted?: boolean
    ): Promise<void>;

    /**
     * Mendapatkan metadata lengkap grup.
     *
     * Contoh:
     * ```javascript
     * const metadata = await getGroupMetadata();
     * console.log("Nama grup:", metadata.subject);
     * console.log("Peserta:", metadata.participants.length);
     * ```
     * @param jid ID grup (opsional, menggunakan grup saat ini jika tidak disediakan)
     * @returns Promise dengan metadata grup atau null jika bukan grup
     */
    getGroupMetadata(jid?: string): Promise<any | null>;

    /**
     * Mendapatkan nama grup.
     *
     * Contoh:
     * ```javascript
     * const groupName = await getGroupName();
     * await sendReply(`Nama grup: ${groupName}`);
     * ```
     * @param groupJid ID grup (opsional, menggunakan grup saat ini jika tidak disediakan)
     * @returns Promise dengan nama grup atau string kosong jika bukan grup
     */
    getGroupName(groupJid?: string): Promise<string>;

    /**
     * Mendapatkan ID pemilik/pembuat grup.
     *
     * Contoh:
     * ```javascript
     * const owner = await getGroupOwner();
     * await sendReply(`Pemilik grup: @${owner.split("@")[0]}`, [owner]);
     * ```
     * @param groupJid ID grup (opsional, menggunakan grup saat ini jika tidak disediakan)
     * @returns Promise dengan ID pemilik atau string kosong jika bukan grup
     */
    getGroupOwner(groupJid?: string): Promise<string>;

    /**
     * Mendapatkan daftar peserta grup.
     *
     * Contoh:
     * ```javascript
     * const participants = await getGroupParticipants();
     * await sendReply(`Total peserta: ${participants.length}`);
     * ```
     * @param groupJid ID grup (opsional, menggunakan grup saat ini jika tidak disediakan)
     * @returns Promise dengan array peserta atau array kosong jika bukan grup
     */
    getGroupParticipants(groupJid?: string): Promise<any[]>;

    /**
     * Mendapatkan daftar admin grup.
     *
     * Contoh:
     * ```javascript
     * const admins = await getGroupAdmins();
     * const adminList = admins.map(admin => `@${admin.split("@")[0]}`).join(", ");
     * await sendReply(`Admin: ${adminList}`, admins);
     * ```
     * @param groupJid ID grup (opsional, menggunakan grup saat ini jika tidak disediakan)
     * @returns Promise dengan array ID admin atau array kosong jika bukan grup
     */
    getGroupAdmins(groupJid?: string): Promise<string[]>;

    /**
     * Mengirim polling/voting di chat.
     *
     * Contoh:
     * ```javascript
     * const options = [
     * { optionName: "Opsi 1" },
     * { optionName: "Opsi 2" },
     * { optionName: "Opsi 3" }
     * ];
     *
     * await sendPoll("Apa opsi favorit Anda?", options, true);
     * ```
     *
     * @param title Judul polling
     * @param options Array objek dengan properti optionName yang merupakan opsi polling
     * @param singleChoice Jika true, memungkinkan hanya satu pilihan per pengguna. Jika false, memungkinkan multiple pilihan
     * @returns Promise dengan hasil operasi
     */
    sendPoll(
      title: string,
      options: { optionName: string }[],
      singleChoice?: boolean
    ): Promise<void>;
  }
}

export {};
