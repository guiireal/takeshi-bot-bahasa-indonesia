const { PREFIX } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");
const { onlyNumbers } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "get-message-data",
  description:
    "Contoh lanjutan cara mendapatkan informasi detail pesan saat ini atau pesan yang dikutip, termasuk analisis media, penyebutan dan metadata teknis",
  commands: ["get-message-data", "metadados", "info-msg"],
  usage: `${PREFIX}get-message-data [balas pesan untuk mendapatkan metadata detailnya]`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    sendReply,
    sendReact,
    sendText,
    webMessage,
    userJid,
    remoteJid,
    isGroup,
    isImage,
    isVideo,
    isSticker,
    isReply,
    fullMessage,
    commandName,
    args,
    fullArgs,
    prefix,
    replyJid,
    getGroupMetadata,
  }) => {
    await sendReply(JSON.stringify(webMessage, null, 2));

    await delay(2000);

    await sendReact("📊");

    await delay(2000);

    await sendReply("🔍 Mendapatkan metadata pesan...");

    let targetMessage = webMessage;
    let isAnalyzingReply = false;

    if (
      isReply &&
      webMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage
    ) {
      targetMessage = {
        ...webMessage,
        message:
          webMessage.message.extendedTextMessage.contextInfo.quotedMessage,
        key: {
          ...webMessage.key,
          participant:
            webMessage.message.extendedTextMessage.contextInfo.participant ||
            replyJid,
          id: webMessage.message.extendedTextMessage.contextInfo.stanzaId,
        },
        messageTimestamp:
          webMessage.message.extendedTextMessage.contextInfo.quotedMessage
            .messageTimestamp || webMessage.messageTimestamp,
        pushName:
          webMessage.message.extendedTextMessage.contextInfo.pushName ||
          "Pengguna",
      };
      isAnalyzingReply = true;
    }

    const analysisType = isAnalyzingReply
      ? "pesan yang dikutip"
      : "pesan saat ini";
    await sendReply(`🔍 Menganalisis metadata *${analysisType}*:`);

    await delay(2000);

    const targetUserJid = isAnalyzingReply ? replyJid : userJid;
    const targetUserNumber = onlyNumbers(targetUserJid);

    const messageText = isAnalyzingReply
      ? getMessageText(targetMessage)
      : fullMessage;
    const messageType = getAdvancedMessageType(
      targetMessage,
      isAnalyzingReply,
      {
        isImage: isAnalyzingReply
          ? getMediaType(targetMessage) && targetMessage.message.imageMessage
          : isImage,
        isVideo: isAnalyzingReply
          ? getMediaType(targetMessage) && targetMessage.message.videoMessage
          : isVideo,
        isSticker: isAnalyzingReply
          ? getMediaType(targetMessage) && targetMessage.message.stickerMessage
          : isSticker,
      }
    );
    const mediaInfo = getEnhancedMediaInfo(targetMessage, isAnalyzingReply);
    const messageFlags = getMessageFlags(targetMessage, isAnalyzingReply, {
      isImage: isAnalyzingReply
        ? getMediaType(targetMessage) && targetMessage.message.imageMessage
        : isImage,
      isVideo: isAnalyzingReply
        ? getMediaType(targetMessage) && targetMessage.message.videoMessage
        : isVideo,
      isSticker: isAnalyzingReply
        ? getMediaType(targetMessage) && targetMessage.message.stickerMessage
        : isSticker,
    });

    const basicInfo = `📋 *Informasi ${
      analysisType.charAt(0).toUpperCase() + analysisType.slice(1)
    }:*

🆔 *Identifikasi:*
• Pengguna: @${targetUserNumber}
• JID: \`${targetUserJid}\`
• Chat: \`${remoteJid}\`
• ID pesan: \`${targetMessage.key?.id || "N/A"}\`
• Timestamp: ${new Date(
      (targetMessage.messageTimestamp || 0) * 1000
    ).toLocaleString("id-ID")}

📱 *Konteks:*
• Adalah grup: ${isGroup ? "Ya" : "Tidak"}
• Tipe pesan: ${messageType}
• Nama pengirim: ${targetMessage.pushName || "N/A"}
• Dikirim oleh bot: ${targetMessage.key?.fromMe ? "Ya" : "Tidak"}
• Adalah siaran: ${targetMessage.broadcast ? "Ya" : "Tidak"}

🏷️ *Flag media:*
${messageFlags}`;

    await sendText(basicInfo, [targetUserJid]);

    await delay(3000);

    const contentInfo = `💬 *Konten Pesan:*

📝 *Teks:*
${messageText ? `"${messageText}"` : "Tanpa teks"}

🎯 *Detail Tipe:*
${mediaInfo}

⚡ *Data Perintah Saat Ini:*
• Nama: ${commandName}
• Prefix: ${prefix}
• Argumen: ${args.length > 0 ? args.join(", ") : "Tidak ada"}
• Args lengkap: ${fullArgs || "Tidak ada"}
• Adalah balasan: ${isReply ? "Ya" : "Tidak"}`;

    await sendReply(contentInfo);

    await delay(3000);

    if (isGroup) {
      try {
        const groupMetadata = await getGroupMetadata();
        const participant = groupMetadata?.participants?.find(
          (p) => p.id === targetUserJid
        );

        const groupInfo = `👥 *Informasi Grup:*

📊 *Peserta:*
• Status: ${participant?.admin ? `Admin (${participant.admin})` : "Anggota"}
• Nama grup: ${groupMetadata?.subject || "N/A"}
• Total peserta: ${groupMetadata?.participants?.length || 0}

🔧 *Konfigurasi:*
• Hanya admin: ${groupMetadata?.announce ? "Ya" : "Tidak"}
• Persetujuan untuk bergabung: ${groupMetadata?.restrict ? "Ya" : "Tidak"}`;

        await sendReply(groupInfo);
        await delay(3000);
      } catch (error) {
        console.error("Error saat mendapatkan metadata grup:", error);
      }
    }

    if (isReply) {
      const quotedMentions =
        webMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage
          ?.extendedTextMessage?.contextInfo?.mentionedJid || [];
      const replyInfo = `🔗 *Informasi Balasan:*

📎 *Konteks:*
• Membalas: @${onlyNumbers(replyJid)}
• ID pesan asli: \`${
        webMessage.message?.extendedTextMessage?.contextInfo?.stanzaId || "N/A"
      }\`
• Menganalisis: ${
        isAnalyzingReply ? "Pesan yang dikutip" : "Pesan perintah Anda"
      }
• Penyebutan dalam pesan yang dikutip: ${
        quotedMentions.length > 0
          ? `${quotedMentions.length} pengguna`
          : "Tidak ada"
      }

🔍 *Analisis Detail:*
• Tipe pesan yang dikutip: ${getMessageType(targetMessage)}
• Memiliki multimedia: ${getMediaType(targetMessage) ? "Ya" : "Tidak"}
• Tanggal pesan yang dikutip: ${new Date(
        (targetMessage.messageTimestamp || 0) * 1000
      ).toLocaleString("id-ID")}`;

      await sendText(replyInfo, [replyJid]);
      await delay(3000);
    }

    await delay(3000);

    await sendReply(
      `💡 *Tips Penggunaan:*

🎯 *Untuk pengembang:*
• Gunakan \`isReply\` untuk mendeteksi balasan
• \`replyJid\` berisi JID pengguna yang dikutip
• \`webMessage.message.extendedTextMessage.contextInfo\` memiliki data pesan yang dikutip
• \`getGroupMetadata()\` menyediakan informasi detail grup

🔄 *Bereksperimen:*
• Balas pesan dengan perintah ini
• Gunakan pada berbagai jenis media
• Coba di grup dan percakapan pribadi`
    );
  },
};

function getMessageText(message) {
  const msg = message.message;
  if (!msg) return null;

  return (
    msg.conversation ||
    msg.extendedTextMessage?.text ||
    msg.imageMessage?.caption ||
    msg.videoMessage?.caption ||
    msg.documentMessage?.caption ||
    msg.audioMessage?.caption ||
    null
  );
}

function getAdvancedMessageType(message, isAnalyzingReply, systemFlags = {}) {
  const msg = message.message;
  if (!msg) return "Tidak diketahui";

  const basicType = getMessageType(message);

  let typeDetails = basicType;

  if (msg.extendedTextMessage?.contextInfo?.quotedMessage) {
    typeDetails += " (dengan kutipan)";
  }

  if (msg.extendedTextMessage?.contextInfo?.mentionedJid?.length > 0) {
    typeDetails += " (dengan penyebutan)";
  }

  if (
    systemFlags.isImage ||
    msg.imageMessage?.isGif ||
    msg.videoMessage?.gifPlayback
  ) {
    if (msg.imageMessage?.isGif || msg.videoMessage?.gifPlayback) {
      typeDetails += " (GIF)";
    }
  }

  if (msg.audioMessage?.ptt) {
    typeDetails = "Audio (pesan suara)";
  }

  const flags = [];
  if (systemFlags.isImage && !isAnalyzingReply) flags.push("📸");
  if (systemFlags.isVideo && !isAnalyzingReply) flags.push("🎥");
  if (systemFlags.isSticker && !isAnalyzingReply) flags.push("🏷️");

  if (flags.length > 0) {
    typeDetails += ` ${flags.join("")}`;
  }

  return typeDetails;
}

function getEnhancedMediaInfo(message) {
  const msg = message.message;
  if (!msg) return "Tanpa media";

  if (msg.imageMessage) {
    const isGif = msg.imageMessage.isGif ? " (GIF)" : "";
    return `📸 Gambar${isGif}
• Ukuran: ${formatFileSize(msg.imageMessage.fileLength)}
• Dimensi: ${msg.imageMessage.width || "N/A"}x${
      msg.imageMessage.height || "N/A"
    }
• Mimetype: ${msg.imageMessage.mimetype || "N/A"}
• SHA256: ${msg.imageMessage.fileSha256 ? "✅" : "❌"}
• Keterangan: ${msg.imageMessage.caption || "Tanpa keterangan"}`;
  }

  if (msg.videoMessage) {
    const isGif = msg.videoMessage.gifPlayback ? " (GIF)" : "";
    return `🎥 Video${isGif}
• Ukuran: ${formatFileSize(msg.videoMessage.fileLength)}
• Durasi: ${msg.videoMessage.seconds || "N/A"}s
• Dimensi: ${msg.videoMessage.width || "N/A"}x${
      msg.videoMessage.height || "N/A"
    }
• Mimetype: ${msg.videoMessage.mimetype || "N/A"}
• SHA256: ${msg.videoMessage.fileSha256 ? "✅" : "❌"}
• Keterangan: ${msg.videoMessage.caption || "Tanpa keterangan"}`;
  }

  if (msg.audioMessage) {
    const isPtt = msg.audioMessage.ptt ? " (Pesan suara)" : "";
    return `🔊 Audio${isPtt}
• Ukuran: ${formatFileSize(msg.audioMessage.fileLength)}
• Durasi: ${msg.audioMessage.seconds || "N/A"}s
• Mimetype: ${msg.audioMessage.mimetype || "N/A"}
• SHA256: ${msg.audioMessage.fileSha256 ? "✅" : "❌"}
• Waveform: ${msg.audioMessage.waveform ? "✅" : "❌"}`;
  }

  if (msg.documentMessage) {
    return `📄 Dokumen
• Nama: ${msg.documentMessage.fileName || "N/A"}
• Ukuran: ${formatFileSize(msg.documentMessage.fileLength)}
• Mimetype: ${msg.documentMessage.mimetype || "N/A"}
• SHA256: ${msg.documentMessage.fileSha256 ? "✅" : "❌"}
• Halaman: ${msg.documentMessage.pageCount || "N/A"}`;
  }

  if (msg.stickerMessage) {
    const isAnimated = msg.stickerMessage.isAnimated ? " (Animasi)" : "";
    return `🏷️ Stiker${isAnimated}
• Ukuran: ${formatFileSize(msg.stickerMessage.fileLength)}
• Dimensi: ${msg.stickerMessage.width || "N/A"}x${
      msg.stickerMessage.height || "N/A"
    }
• Mimetype: ${msg.stickerMessage.mimetype || "N/A"}
• SHA256: ${msg.stickerMessage.fileSha256 ? "✅" : "❌"}`;
  }

  if (msg.contactMessage) {
    return `👤 Kontak
• Nama: ${msg.contactMessage.displayName || "N/A"}
• VCard: ${msg.contactMessage.vcard ? "✅" : "❌"}`;
  }

  if (msg.locationMessage) {
    return `📍 Lokasi
• Lintang: ${msg.locationMessage.degreesLatitude || "N/A"}
• Bujur: ${msg.locationMessage.degreesLongitude || "N/A"}
• Nama: ${msg.locationMessage.name || "N/A"}
• Alamat: ${msg.locationMessage.address || "N/A"}`;
  }

  return "Teks tanpa media";
}

function getMessageFlags(message) {
  const msg = message.message;
  if (!msg) return "Tidak ada flag terdeteksi";

  const flags = [];

  if (msg.imageMessage) flags.push("📸 Gambar");
  if (msg.videoMessage) flags.push("🎥 Video");
  if (msg.audioMessage) flags.push("🔊 Audio");
  if (msg.documentMessage) flags.push("📄 Dokumen");
  if (msg.stickerMessage) flags.push("🏷️ Stiker");
  if (msg.contactMessage) flags.push("👤 Kontak");
  if (msg.locationMessage) flags.push("📍 Lokasi");

  if (msg.imageMessage?.isGif || msg.videoMessage?.gifPlayback)
    flags.push("🎭 GIF");
  if (msg.audioMessage?.ptt) flags.push("🎤 Pesan suara");
  if (msg.stickerMessage?.isAnimated) flags.push("✨ Stiker animasi");

  if (msg.extendedTextMessage?.contextInfo?.quotedMessage)
    flags.push("💬 Dengan kutipan");
  if (msg.extendedTextMessage?.contextInfo?.mentionedJid?.length > 0) {
    flags.push(
      `👥 ${msg.extendedTextMessage.contextInfo.mentionedJid.length} penyebutan`
    );
  }

  if (message.key?.fromMe) flags.push("🤖 Dikirim oleh bot");
  if (message.broadcast) flags.push("📡 Siaran");

  return flags.length > 0 ? flags.join("\n• ") : "Tidak ada flag khusus";
}

function formatFileSize(bytes) {
  if (!bytes) return "N/A";

  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
}

function getMessageType(message) {
  const msg = message.message;
  if (!msg) return "Tidak diketahui";

  if (msg.conversation) return "Teks sederhana";
  if (msg.extendedTextMessage) return "Teks diperluas";
  if (msg.imageMessage) return "Gambar";
  if (msg.videoMessage) return "Video";
  if (msg.audioMessage) return "Audio";
  if (msg.documentMessage) return "Dokumen";
  if (msg.stickerMessage) return "Stiker";
  if (msg.locationMessage) return "Lokasi";
  if (msg.contactMessage) return "Kontak";

  return Object.keys(msg)[0] || "Tidak diketahui";
}

function getMediaType(message) {
  const msg = message.message;
  if (!msg) return false;

  return !!(
    msg.imageMessage ||
    msg.videoMessage ||
    msg.audioMessage ||
    msg.documentMessage ||
    msg.stickerMessage
  );
}
