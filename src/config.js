const path = require("path");

// Prefix perintah.
exports.PREFIX = "/";

// Emoji bot (ubah jika Anda mau).
exports.BOT_EMOJI = "🤖";

// Nama bot (ubah jika Anda mau).
exports.BOT_NAME = "Takeshi Bot";

// Nomor bot.
// Hanya angka, persis seperti yang muncul di WhatsApp.
exports.BOT_NUMBER = "558112345678";

// Nomor pemilik bot.
// Hanya angka, persis seperti yang muncul di WhatsApp.
exports.OWNER_NUMBER = "5521950502020";

// LID pemilik bot.
// Untuk mendapatkan LID pemilik bot, gunakan perintah <prefix>get-lid @mention atau +telepon pemilik.
exports.OWNER_LID = "219999999999999@lid";

// Direktori perintah
exports.COMMANDS_DIR = path.join(__dirname, "commands");

// Direktori file media.
exports.DATABASE_DIR = path.resolve(__dirname, "..", "database");

// Direktori file media.
exports.ASSETS_DIR = path.resolve(__dirname, "..", "assets");

// Direktori file sementara.
exports.TEMP_DIR = path.resolve(__dirname, "..", "assets", "temp");

// Waktu tunggu dalam milidetik per event (menghindari ban).
exports.TIMEOUT_IN_MILLISECONDS_BY_EVENT = 300;

// Platform API
exports.SPIDER_API_BASE_URL = "https://api.spiderx.com.br/api";

// Dapatkan token Anda dengan membuat akun di: https://api.spiderx.com.br.
exports.SPIDER_API_TOKEN = "token_anda_di_sini";

// Jika Anda ingin merespons hanya grup tertentu,
// masukkan ID-nya di konfigurasi berikut.
// Untuk mengetahui ID grup, gunakan perintah <prefix>getid
// Ganti <prefix> dengan prefix bot (contoh: /getid).
exports.ONLY_GROUP_ID = "";

// Direktori dasar proyek.
exports.BASE_DIR = path.resolve(__dirname);

// Jika Anda ingin menggunakan proxy.
exports.PROXY_PROTOCOL = "http";
exports.PROXY_HOST = "ip";
exports.PROXY_PORT = "port";
exports.PROXY_USERNAME = "username";
exports.PROXY_PASSWORD = "password";
