/**
 * Event yang dipanggil ketika pengguna
 * masuk atau keluar dari grup WhatsApp.
 *
 * @author Dev Gui
 */
const { getProfileImageData } = require("../services/baileys");
const fs = require("fs");
const { onlyNumbers } = require("../utils");
const {
  isActiveWelcomeGroup,
  isActiveExitGroup,
} = require("../utils/database");

const { catBoxUpload } = require("../services/catbox");
const {
  spiderAPITokenConfigured,
  exit,
  welcome,
} = require("../services/spider-x-api");

exports.onGroupParticipantsUpdate = async ({
  userJid,
  remoteJid,
  socket,
  action,
}) => {
  try {
    if (!remoteJid.endsWith("@g.us")) {
      return;
    }

    if (isActiveWelcomeGroup(remoteJid) && action === "add") {
      const { buffer, profileImage } = await getProfileImageData(
        socket,
        userJid
      );

      if (spiderAPITokenConfigured) {
        try {
          const link = await catBoxUpload(buffer);

          if (!link) {
            throw new Error("Link tidak valid");
          }

          const url = welcome(
            "peserta",
            "Anda adalah anggota baru grup!",
            link
          );

          await socket.sendMessage(remoteJid, {
            image: { url },
            caption: `Selamat datang di grup kami, @${onlyNumbers(userJid)}!`,
            mentions: [userJid],
          });
        } catch (error) {
          console.error("Error saat mengunggah gambar:", error);
          await socket.sendMessage(remoteJid, {
            image: buffer,
            caption: `Selamat datang di grup kami, @${onlyNumbers(userJid)}!`,
            mentions: [userJid],
          });
        }
      } else {
        await socket.sendMessage(remoteJid, {
          image: buffer,
          caption: `Selamat datang di grup kami, @${onlyNumbers(userJid)}!`,
          mentions: [userJid],
        });
      }

      if (!profileImage.includes("default-user")) {
        fs.unlinkSync(profileImage);
      }
    } else if (isActiveExitGroup(remoteJid) && action === "remove") {
      const { buffer, profileImage } = await getProfileImageData(
        socket,
        userJid
      );

      if (spiderAPITokenConfigured) {
        try {
          const link = await catBoxUpload(buffer);

          if (!link) {
            throw new Error("Link tidak valid");
          }

          const url = exit("anggota", "Anda adalah anggota yang baik", link);

          await socket.sendMessage(remoteJid, {
            image: { url },
            caption: `Selamat tinggal, @${onlyNumbers(userJid)}!`,
            mentions: [userJid],
          });
        } catch (error) {
          console.error("Error saat mengunggah gambar:", error);
          await socket.sendMessage(remoteJid, {
            image: buffer,
            caption: `Selamat tinggal, @${onlyNumbers(userJid)}!`,
            mentions: [userJid],
          });
        }
      } else {
        await socket.sendMessage(remoteJid, {
          image: buffer,
          caption: `Selamat tinggal, @${onlyNumbers(userJid)}!`,
          mentions: [userJid],
        });
      }

      if (!profileImage.includes("default-user")) {
        fs.unlinkSync(profileImage);
      }
    }
  } catch (error) {
    console.error(
      "Error saat memproses event onGroupParticipantsUpdate:",
      error
    );
    process.exit(1);
  }
};
