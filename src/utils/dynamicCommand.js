/**
 * Pengarah
 * perintah.
 *
 * @author Dev Gui
 */
const {
  DangerError,
  WarningError,
  InvalidParameterError,
} = require("../errors");
const { findCommandImport } = require(".");
const {
  verifyPrefix,
  hasTypeOrCommand,
  isLink,
  isAdmin,
} = require("../middlewares");
const { checkPermission } = require("../middlewares/checkPermission");
const {
  isActiveGroup,
  getAutoResponderResponse,
  isActiveAutoResponderGroup,
  isActiveAntiLinkGroup,
} = require("./database");
const { errorLog } = require("../utils/logger");
const { ONLY_GROUP_ID } = require("../config");
const { badMacHandler } = require("./badMacHandler");

exports.dynamicCommand = async (paramsHandler, startProcess) => {
  const {
    commandName,
    prefix,
    sendWarningReply,
    sendErrorReply,
    remoteJid,
    sendReply,
    socket,
    userJid,
    fullMessage,
    webMessage,
  } = paramsHandler;

  if (isActiveAntiLinkGroup(remoteJid) && isLink(fullMessage)) {
    if (!userJid) return;

    if (!(await isAdmin({ remoteJid, userJid, socket }))) {
      await socket.groupParticipantsUpdate(remoteJid, [userJid], "remove");

      await sendReply(
        "Anti-link diaktifkan! Anda telah dikeluarkan karena mengirim link!"
      );

      await socket.sendMessage(remoteJid, {
        delete: {
          remoteJid,
          fromMe: false,
          id: webMessage.key.id,
          participant: webMessage.key.participant,
        },
      });

      return;
    }
  }

  const { type, command } = findCommandImport(commandName);

  if (ONLY_GROUP_ID && ONLY_GROUP_ID !== remoteJid) {
    return;
  }

  if (!verifyPrefix(prefix) || !hasTypeOrCommand({ type, command })) {
    if (isActiveAutoResponderGroup(remoteJid)) {
      const response = getAutoResponderResponse(fullMessage);

      if (response) {
        await sendReply(response);
      }
    }

    return;
  }

  if (!(await checkPermission({ type, ...paramsHandler }))) {
    await sendErrorReply(
      "Anda tidak memiliki izin untuk menjalankan perintah ini!"
    );
    return;
  }

  if (!isActiveGroup(remoteJid) && command.name !== "on") {
    await sendWarningReply(
      "Grup ini dinonaktifkan! Minta pemilik grup untuk mengaktifkan bot!"
    );

    return;
  }

  try {
    await command.handle({
      ...paramsHandler,
      type,
      startProcess,
    });
  } catch (error) {
    if (badMacHandler.handleError(error, `command:${command.name}`)) {
      await sendWarningReply(
        "Error sinkronisasi sementara. Coba lagi dalam beberapa detik."
      );
      return;
    }

    if (badMacHandler.isSessionError(error)) {
      errorLog(
        `Error sesi selama eksekusi perintah ${command.name}: ${error.message}`
      );
      await sendWarningReply("Error komunikasi. Coba jalankan perintah lagi.");
      return;
    }

    if (error instanceof InvalidParameterError) {
      await sendWarningReply(`Parameter tidak valid! ${error.message}`);
    } else if (error instanceof WarningError) {
      await sendWarningReply(error.message);
    } else if (error instanceof DangerError) {
      await sendErrorReply(error.message);
    } else {
      errorLog("Error saat menjalankan perintah", error);
      await sendErrorReply(
        `Terjadi error saat menjalankan perintah ${command.name}! Developer telah diberitahu!
      
📄 *Detail*: ${error.message}`
      );
    }
  }
};
