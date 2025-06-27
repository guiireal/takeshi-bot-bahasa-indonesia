/*
 * File index.js ini sama dengan yang ada di "src/index.js", hanya berada di sini
 * untuk memudahkan eksekusi bot di beberapa host.
 *
 * Jika Anda mengklik di sini, itu karena Anda mungkin sudah pernah menggunakan bot "case" dengan "index.js" 20 ribu baris...
 * Ya, saya tahu, saya mengerti!
 * Mana yang lebih baik? Bot Anda error di "play", Anda pergi ke file "play.js" dan memperbaikinya
 * atau Anda pergi ke baris 71023 dari "index.js" dan memperbaikinya?
 *
 * Bayangkan jika Anda menempel "case" Anda dengan salah dan lupa menutup
 * atau membuka tanda kurung, kurung kurawal...
 * Anda menjalankan bot, mendapat beberapa error dan tidak tahu cara menyelesaikannya...
 * Tebak apa yang Anda lakukan?
 * Anda kembali ke "index.js" yang Anda miliki sebelumnya, kan?
 *
 * Itulah yang tidak kita inginkan! Kita ingin kode yang bersih, mudah dibaca dan mudah dipelihara!
 * Kita membuat kode untuk manusia, bukan untuk mesin, jadi, semakin sederhana, semakin baik!
 *
 * Mulai sekarang, kita akan mengganti kata "case" dengan "perintah", oke? Ayo mulai!
 *
 * ---------------- 🤖 DI MANA PERINTAH-PERINTAHNYA? 🤖 ----------------
 *
 * Anda akan menemukan perintah-perintah di dalam folder "src/commands"
 * Tidak mengerti? Mari kita lihat!
 *
 * Buka folder "src"
 * Kemudian, buka folder "commands"
 *
 * Perhatikan bahwa di dalamnya ada 3 folder:
 *
 * - 📁 admin
 * - 📁 member
 * - 📁 owner
 *
 * Di dalam folder "admin" ada perintah-perintah administratif.
 * Di dalam folder "member" ada perintah-perintah untuk anggota.
 * Di dalam folder "owner" ada perintah-perintah yang hanya bisa diakses oleh pemilik bot/grup.
 *
 * Sederhana, kan? Oh, satu detail: Anda tidak perlu memasukkan "if" untuk mengetahui apakah perintah itu admin atau owner.
 * Bot sudah melakukannya untuk Anda! Anda hanya perlu menempatkan perintah di folder yang sesuai!
 *
 * ---------------- 🤖 DI MANA SAYA MEMODIFIKASI MENU? 🤖 ----------------
 *
 * Buka folder "src"
 * Pergi ke file "messages.js" dan edit menunya!
 * Ingat saja, lakukan semuanya di dalam tanda kutip (`), karena itu adalah template string.
 *
 * Tidak mengerti?
 * Lihat:
 *
 * `Halo, apa kabar!` - Ini BENAR ✅
 *
 * Halo `apa kabar?` - Ini SALAH (perhatikan bahwa "Halo" berada di luar tanda kutip) ❌
 *
 * ---------------- 🤖 BAGAIMANA CARA MENGGANTI FOTO BOT? 🤖 ----------------
 *
 * Buka folder "assets"
 * Kemudian, buka folder "images"
 * Ganti gambar "takeshi-bot.png" dengan gambar pilihan Anda!
 * Jangan lupa untuk tetap mempertahankan nama "takeshi-bot.png"
 *
 * ---------------- 🚀 PENTING 🚀 ----------------
 *
 * Baca tutorial lengkap di: https://github.com/guiireal/takeshi-bot?tab=readme-ov-file#instala%C3%A7%C3%A3o-no-termux-
 *
 * Jangan lewati langkah-langkahnya! Baca lengkap, karena sangat penting agar Anda memahami cara kerja bot!
 *
 * Oleh: Dev Gui
 *
 * Jangan modifikasi apapun di bawah ini, kecuali Anda tahu apa yang Anda lakukan!
 */
const { connect } = require("./src/connection");
const { load } = require("./src/loader");
const { badMacHandler } = require("./src/utils/badMacHandler");
const {
  successLog,
  errorLog,
  warningLog,
  bannerLog,
  infoLog,
} = require("./src/utils/logger");

process.on("uncaughtException", (error) => {
  if (badMacHandler.handleError(error, "uncaughtException")) {
    return;
  }

  errorLog(`Error kritis yang tidak tertangani: ${error.message}`);
  errorLog(error.stack);

  if (
    !error.message.includes("ENOTFOUND") &&
    !error.message.includes("timeout")
  ) {
    process.exit(1);
  }
});

process.on("unhandledRejection", (reason, promise) => {
  if (badMacHandler.handleError(reason, "unhandledRejection")) {
    return;
  }

  errorLog(`Promise yang ditolak tidak tertangani:`, reason);
});

async function startBot() {
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    process.setMaxListeners(1500);

    bannerLog();
    infoLog("Memulai komponen internal saya...");

    const stats = badMacHandler.getStats();
    if (stats.errorCount > 0) {
      warningLog(
        `Statistik BadMacHandler: ${stats.errorCount}/${stats.maxRetries} error`
      );
    }

    const socket = await connect();

    load(socket);

    successLog("✅ Bot berhasil dimulai!");

    setInterval(() => {
      const currentStats = badMacHandler.getStats();
      if (currentStats.errorCount > 0) {
        warningLog(
          `Statistik BadMacHandler: ${currentStats.errorCount}/${currentStats.maxRetries} error`
        );
      }
    }, 300_000);
  } catch (error) {
    if (badMacHandler.handleError(error, "bot-startup")) {
      warningLog("Error Bad MAC selama inisialisasi, mencoba lagi...");

      setTimeout(() => {
        startBot();
      }, 5000);
      return;
    }

    errorLog(`Error saat memulai bot: ${error.message}`);
    errorLog(error.stack);
    process.exit(1);
  }
}

startBot();
