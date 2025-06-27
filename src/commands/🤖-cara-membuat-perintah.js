/**
 * Ini adalah model perintah.
 * Salin dan tempel file ini untuk membuat perintah baru di salah satu folder: admin, member atau owner
 * Anda harus mengganti namanya agar mudah diidentifikasi di folder tujuan.
 *
 * Folder owner: Perintah yang hanya dapat dieksekusi oleh pemilik grup/bot
 * Folder admin: Perintah yang hanya dapat dieksekusi oleh admin grup
 * Folder member: Perintah yang dapat dieksekusi oleh anggota grup mana pun
 *
 * Fungsi dan variabel yang dapat diekstrak dari handle di "handle: async ({ di sini })"
 * Apa yang dapat Anda ekstrak dari handle didefinisikan di src/@types/index.d.ts
 * Hati-hati, perhatikan huruf besar dan kecil!
 *
 * @author Dev Gui
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "perintah",
  description: "Deskripsi perintah",
  commands: ["perintah1", "perintah2"],
  usage: `${PREFIX}perintah`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendAudioFromBuffer }) => {
    // kode perintah
  },
};
