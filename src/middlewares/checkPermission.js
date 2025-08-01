/**
 * Interceptor validasi
 * izin pengguna.
 *
 * @author Dev Gui
 */
const { OWNER_NUMBER, OWNER_LID } = require("../config");
const { toUserJid } = require("../utils");

exports.checkPermission = async ({ type, socket, userJid, remoteJid }) => {
  if (type === "member") {
    return true;
  }

  try {
    const { participants, owner } = await socket.groupMetadata(remoteJid);

    const participant = participants.find(
      (participant) => participant.id === userJid
    );

    if (!participant) {
      return false;
    }

    const isOwner =
      participant.id === owner || participant.admin === "superadmin";

    const isAdmin = participant.admin === "admin";

    const isBotOwner =
      userJid === toUserJid(OWNER_NUMBER) || userJid === OWNER_LID;

    if (type === "admin") {
      return isOwner || isAdmin || isBotOwner;
    }

    if (type === "owner") {
      return isOwner || isBotOwner;
    }

    return false;
  } catch (error) {
    return false;
  }
};
