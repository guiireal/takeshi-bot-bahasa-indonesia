const { PREFIX } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");

module.exports = {
  name: "get-group-data",
  description: "Contoh cara mendapatkan informasi detail grup",
  commands: ["get-group-data"],
  usage: `${PREFIX}get-group-data`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    sendReply,
    sendReact,
    sendErrorReply,
    getGroupMetadata,
    isGroup,
    socket,
    remoteJid,
  }) => {
    await sendReact("👥");

    await delay(3000);

    if (!isGroup) {
      return await sendErrorReply("Perintah ini hanya berfungsi di grup!");
    }

    await sendReply("Saya akan mendapatkan informasi grup saat ini:");

    await delay(3000);

    try {
      const groupMetadata = await getGroupMetadata();

      const groupInfo = `👥 *Informasi Grup:*

📝 *Dasar:*
• Nama: ${groupMetadata.subject}
• Deskripsi: ${groupMetadata.desc || "Tanpa deskripsi"}
• ID: ${groupMetadata.id}

👤 *Peserta:*
• Total: ${groupMetadata.participants.length} anggota
• Admin: ${groupMetadata.participants.filter((p) => p.admin).length}
• Anggota: ${groupMetadata.participants.filter((p) => !p.admin).length}

⚙️ *Konfigurasi:*
• Dibuat pada: ${new Date(groupMetadata.creation * 1000).toLocaleDateString(
        "id-ID"
      )}
• Pemilik: ${groupMetadata.owner || "N/A"}
• Hanya admin yang bisa mengirim: ${groupMetadata.announce ? "Ya" : "Tidak"}
• Persetujuan untuk bergabung: ${groupMetadata.restrict ? "Ya" : "Tidak"}`;

      await sendReply(groupInfo);

      await delay(3000);

      const admins = groupMetadata.participants.filter((p) => p.admin);

      if (admins.length > 0) {
        const adminList =
          `👑 *Administrator (${admins.length}):*\n\n` +
          admins
            .map(
              (admin, index) =>
                `${index + 1}. @${admin.id.split("@")[0]} ${
                  admin.admin === "superadmin" ? "(Pembuat)" : "(Admin)"
                }`
            )
            .join("\n");

        await socket.sendMessage(remoteJid, {
          text: adminList,
          mentions: admins.map((admin) => admin.id),
        });
      }

      await delay(3000);

      await sendReply(
        "💡 *Fungsi berguna:*\n\n" +
          "• `socket.groupMetadata(jid) atau getGroupMetadata()` - Mendapatkan metadata grup\n" +
          "• `groupMetadata.participants` - Daftar peserta\n" +
          "• `groupMetadata.subject` - Nama grup\n" +
          "• `groupMetadata.desc` - Deskripsi grup"
      );
    } catch (error) {
      await sendErrorReply(
        `Error saat mendapatkan data grup: ${error.message}`
      );
    }
  },
};
