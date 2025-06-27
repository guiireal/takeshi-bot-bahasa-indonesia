const { PREFIX } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");

module.exports = {
  name: "group-functions",
  description: "Contoh cara menggunakan fungsi utilitas grup",
  commands: ["group-functions"],
  usage: `${PREFIX}group-functions`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    sendReply,
    sendReact,
    sendErrorReply,
    isGroup,
    getGroupMetadata,
    getGroupName,
    getGroupOwner,
    getGroupParticipants,
    getGroupAdmins,
    socket,
    remoteJid,
  }) => {
    await sendReact("👥");

    await delay(3000);

    if (!isGroup) {
      return await sendErrorReply("Perintah ini hanya berfungsi di grup!");
    }

    await sendReply("Saya akan mendemonstrasikan fungsi utilitas grup:");

    await delay(3000);

    const groupName = await getGroupName();
    await sendReply(`📝 *Nama grup:* ${groupName}`);

    await delay(3000);

    const groupOwner = await getGroupOwner();
    if (groupOwner) {
      await socket.sendMessage(remoteJid, {
        text: `👑 *Pemilik grup:* @${groupOwner.split("@")[0]}`,
        mentions: [groupOwner],
      });
    }

    await delay(3000);

    const participants = await getGroupParticipants();
    await sendReply(`👤 *Total peserta:* ${participants.length}`);

    await delay(3000);

    const admins = await getGroupAdmins();
    if (admins.length > 0) {
      const adminList = admins
        .map((admin) => `@${admin.split("@")[0]}`)
        .join(", ");
      await socket.sendMessage(remoteJid, {
        text: `👮 *Administrator (${admins.length}):*\n${adminList}`,
        mentions: admins,
      });
    } else {
      await sendReply("👮 *Tidak ada administrator ditemukan.*");
    }

    await delay(3000);

    const metadata = await getGroupMetadata();
    if (metadata) {
      const creationDate = new Date(
        metadata.creation * 1000
      ).toLocaleDateString("id-ID");
      const announce = metadata.announce ? "Ya" : "Tidak";
      const restrict = metadata.restrict ? "Ya" : "Tidak";

      await sendReply(
        `📊 *Metadata grup:*\n\n` +
          `• ID: ${metadata.id}\n` +
          `• Dibuat pada: ${creationDate}\n` +
          `• Hanya admin yang mengirim: ${announce}\n` +
          `• Persetujuan untuk bergabung: ${restrict}\n` +
          `• Deskripsi: ${metadata.desc || "Tanpa deskripsi"}`
      );
    }

    await delay(3000);

    await sendReply(
      "💡 *Fungsi yang tersedia:*\n\n" +
        "• `getGroupMetadata(remoteJid?)` - Metadata lengkap\n" +
        "• `getGroupName(remoteJid?)` - Nama grup\n" +
        "• `getGroupOwner(remoteJid?)` - Pemilik grup\n" +
        "• `getGroupParticipants(remoteJid?)` - Daftar peserta\n" +
        "• `getGroupAdmins(remoteJid?)` - Daftar administrator\n\n" +
        "🔧 *Parameter opsional:*\n" +
        "• `remoteJid` - ID grup/percakapan (jika tidak disediakan, gunakan grup saat ini)"
    );
  },
};
