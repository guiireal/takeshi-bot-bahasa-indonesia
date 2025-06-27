/**
 * Script
 * inisialisasi bot.
 *
 * Script ini
 * bertanggung jawab untuk
 * memulai koneksi
 * dengan WhatsApp.
 *
 * Tidak disarankan untuk mengubah
 * file ini,
 * kecuali Anda tahu
 * apa yang Anda lakukan.
 *
 * @author Dev Gui
 */
const path = require("node:path");
const { question, onlyNumbers } = require("./utils");
const {
  default: makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  isJidBroadcast,
  makeCacheableSignalKeyStore,
  isJidStatusBroadcast,
  isJidNewsletter,
} = require("baileys");
const pino = require("pino");
const { load } = require("./loader");
const {
  warningLog,
  infoLog,
  errorLog,
  sayLog,
  successLog,
} = require("./utils/logger");
const NodeCache = require("node-cache");
const { TEMP_DIR } = require("./config");
const { badMacHandler } = require("./utils/badMacHandler");

const logger = pino(
  { timestamp: () => `,"time":"${new Date().toJSON()}"` },
  pino.destination(path.join(TEMP_DIR, "wa-logs.txt"))
);

logger.level = "error";

const msgRetryCounterCache = new NodeCache();

async function connect() {
  const baileysFolder = path.resolve(
    __dirname,
    "..",
    "assets",
    "auth",
    "baileys"
  );

  const { state, saveCreds } = await useMultiFileAuthState(baileysFolder);

  const { version } = await fetchLatestBaileysVersion();

  const socket = makeWASocket({
    version,
    logger,
    defaultQueryTimeoutMs: undefined,
    retryRequestDelayMs: 5000,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, logger),
    },
    shouldIgnoreJid: (jid) =>
      isJidBroadcast(jid) || isJidStatusBroadcast(jid) || isJidNewsletter(jid),
    keepAliveIntervalMs: 30_000,
    maxMsgRetryCount: 5,
    markOnlineOnConnect: true,
    syncFullHistory: false,
    msgRetryCounterCache,
    shouldSyncHistoryMessage: () => false,
  });

  if (!socket.authState.creds.registered) {
    warningLog("Kredensial belum dikonfigurasi!");

    infoLog('Masukkan nomor telepon bot (contoh: "5511920202020"):');

    const phoneNumber = await question("Masukkan nomor telepon bot: ");

    if (!phoneNumber) {
      errorLog(
        'Nomor telepon tidak valid! Coba lagi dengan perintah "npm start".'
      );

      process.exit(1);
    }

    const code = await socket.requestPairingCode(onlyNumbers(phoneNumber));

    sayLog(`Kode pairing: ${code}`);
  }

  socket.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const error = lastDisconnect?.error;
      const statusCode = error?.output?.statusCode;

      if (
        error?.message?.includes("Bad MAC") ||
        error?.toString()?.includes("Bad MAC")
      ) {
        errorLog("Error Bad MAC pada pemutusan koneksi terdeteksi");

        if (badMacHandler.handleError(error, "connection.update")) {
          if (badMacHandler.hasReachedLimit()) {
            warningLog(
              "Batas error Bad MAC tercapai. Membersihkan file sesi bermasalah..."
            );
            badMacHandler.clearProblematicSessionFiles();
            badMacHandler.resetErrorCount();

            const newSocket = await connect();
            load(newSocket);
            return;
          }
        }
      }

      if (statusCode === DisconnectReason.loggedOut) {
        errorLog("Bot terputus!");
        badMacErrorCount = 0;
      } else {
        switch (statusCode) {
          case DisconnectReason.badSession:
            warningLog("Sesi tidak valid!");

            const sessionError = new Error("Bad session detected");
            if (badMacHandler.handleError(sessionError, "badSession")) {
              if (badMacHandler.hasReachedLimit()) {
                warningLog(
                  "Batas error sesi tercapai. Membersihkan file sesi..."
                );
                badMacHandler.clearProblematicSessionFiles();
                badMacHandler.resetErrorCount();
              }
            }
            break;
          case DisconnectReason.connectionClosed:
            warningLog("Koneksi ditutup!");
            break;
          case DisconnectReason.connectionLost:
            warningLog("Koneksi hilang!");
            break;
          case DisconnectReason.connectionReplaced:
            warningLog("Koneksi diganti!");
            break;
          case DisconnectReason.multideviceMismatch:
            warningLog("Perangkat tidak kompatibel!");
            break;
          case DisconnectReason.forbidden:
            warningLog("Koneksi dilarang!");
            break;
          case DisconnectReason.restartRequired:
            infoLog('Silakan restart saya! Ketik "npm start".');
            break;
          case DisconnectReason.unavailableService:
            warningLog("Layanan tidak tersedia!");
            break;
        }

        const newSocket = await connect();
        load(newSocket);
      }
    } else if (connection === "open") {
      successLog("Saya berhasil terhubung!");
      badMacErrorCount = 0;
      badMacHandler.resetErrorCount();
    } else {
      infoLog("Memperbarui koneksi...");
    }
  });

  socket.ev.on("creds.update", saveCreds);

  return socket;
}

exports.connect = connect;
