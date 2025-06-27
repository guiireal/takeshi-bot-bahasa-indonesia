/**
 * Menu bot
 *
 * @author Dev Gui
 */
const { BOT_NAME, PREFIX } = require("./config");
const packageInfo = require("../package.json");
const { readMore } = require("./utils");

exports.menuMessage = () => {
  const date = new Date();

  return `╭━━⪩ SELAMAT DATANG! ⪨━━${readMore()}
▢
▢ • ${BOT_NAME}
▢ • Tanggal: ${date.toLocaleDateString("id-id")}
▢ • Waktu: ${date.toLocaleTimeString("id-id")}
▢ • Prefix: ${PREFIX}
▢ • Versi: ${packageInfo.version}
▢
╰━━─「🪐」─━━

╭━━⪩ PEMILIK ⪨━━
▢
▢ • ${PREFIX}exec
▢ • ${PREFIX}get-id
▢ • ${PREFIX}off
▢ • ${PREFIX}on
▢ • ${PREFIX}set-menu-image
▢
╰━━─「🌌」─━━

╭━━⪩ ADMIN ⪨━━
▢
▢ • ${PREFIX}anti-link (1/0)
▢ • ${PREFIX}auto-responder (1/0)
▢ • ${PREFIX}ban
▢ • ${PREFIX}clear
▢ • ${PREFIX}close
▢ • ${PREFIX}demote
▢ • ${PREFIX}exit (1/0)
▢ • ${PREFIX}hidetag
▢ • ${PREFIX}mute
▢ • ${PREFIX}open
▢ • ${PREFIX}promote
▢ • ${PREFIX}reveal
▢ • ${PREFIX}schedule-message
▢ • ${PREFIX}unmute
▢ • ${PREFIX}welcome (1/0)
▢
╰━━─「⭐」─━━

╭━━⪩ UTAMA ⪨━━
▢
▢ • ${PREFIX}attp
▢ • ${PREFIX}fake-chat
▢ • ${PREFIX}generate-link
▢ • ${PREFIX}get-lid
▢ • ${PREFIX}google-search
▢ • ${PREFIX}perfil
▢ • ${PREFIX}profile
▢ • ${PREFIX}raw-message
▢ • ${PREFIX}rename
▢ • ${PREFIX}samples-of-messages
▢ • ${PREFIX}sticker
▢ • ${PREFIX}to-image
▢ • ${PREFIX}ttp
▢ • ${PREFIX}yt-search
▢
╰━━─「🚀」─━━

╭━━⪩ UNDUHAN ⪨━━
▢
▢ • ${PREFIX}play-audio
▢ • ${PREFIX}play-video
▢ • ${PREFIX}tik-tok
▢ • ${PREFIX}yt-mp3
▢ • ${PREFIX}yt-mp4
▢
╰━━─「🎶」─━━

╭━━⪩ PERMAINAN ⪨━━
▢
▢ • ${PREFIX}berjuang
▢ • ${PREFIX}ciuman
▢ • ${PREFIX}diberikan
▢ • ${PREFIX}makan-malam
▢ • ${PREFIX}membunuh
▢ • ${PREFIX}memukul
▢ • ${PREFIX}merangkul
▢ • ${PREFIX}tamparan
▢
╰━━─「🎡」─━━

╭━━⪩ AI ⪨━━
▢
▢ • ${PREFIX}gemini
▢ • ${PREFIX}ia-sticker
▢ • ${PREFIX}pixart
▢ • ${PREFIX}stable-diffusion-turbo
▢
╰━━─「🚀」─━━

╭━━⪩ KANVAS ⪨━━
▢
▢ • ${PREFIX}blur
▢ • ${PREFIX}contrast
▢ • ${PREFIX}gray
▢ • ${PREFIX}invert
▢ • ${PREFIX}jail
▢ • ${PREFIX}mirror
▢ • ${PREFIX}pixel
▢ • ${PREFIX}rip
▢
╰━━─「❇」─━━`;
};
