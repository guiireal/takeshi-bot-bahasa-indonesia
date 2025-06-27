/**
 * Dikembangkan oleh: Mkg
 * Direfaktor oleh: Dev Gui
 *
 * @author Dev Gui
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "schedule-message",
  description:
    "Menjadwalkan pesan untuk dikirim setelah waktu yang ditentukan.",
  commands: ["schedule", "schedule-message"],
  usage: `${PREFIX}schedule-message pesan / waktu
 
Contoh: ${PREFIX}schedule-message Rapat besok / 10m`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ args, sendErrorReply, sendSuccessReply, sendText }) => {
    if (args.length !== 2) {
      return await sendErrorReply(
        `Format salah. Gunakan: ${PREFIX}schedule-message pesan / waktu
        
Contoh: ${PREFIX}schedule-message Rapat besok / 10m`
      );
    }

    const rawTime = args[1].trim();

    const message = args[0].trim();

    let timeInMs = 0;

    if (/^\d+s$/.test(rawTime)) {
      timeInMs = parseInt(rawTime) * 1000;
    } else if (/^\d+m$/.test(rawTime)) {
      timeInMs = parseInt(rawTime) * 60 * 1000;
    } else if (/^\d+h$/.test(rawTime)) {
      timeInMs = parseInt(rawTime) * 60 * 60 * 1000;
    } else {
      return await sendErrorReply(
        `Format waktu tidak valid.
Gunakan:\n• 10s untuk 10 detik\n• 5m untuk 5 menit\n• 2h untuk 2 jam`
      );
    }

    if (!message || message.trim() === "" || isNaN(timeInMs) || timeInMs <= 0) {
      return await sendErrorReply(
        "Pesan tidak valid atau waktu tidak ditentukan dengan benar."
      );
    }

    await sendSuccessReply(`⌚ Pesan dijadwalkan untuk dalam ${rawTime}...`);

    setTimeout(async () => {
      await sendText(`⏰ *Pesan terjadwal:*\n\n${message}`);
    }, timeInMs);
  },
};
