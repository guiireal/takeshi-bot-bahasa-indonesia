const {
  activateOnlyAdmins,
  deactivateOnlyAdmins,
  isActiveOnlyAdmins,
} = require("../../utils/database");

const { InvalidParameterError, WarningError } = require(`${BASE_DIR}/errors`);

const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "only-admin",
  description: "Izinkan hanya admin yang menggunakan perintah saya.",
  commands: [
    "only-admin",
    "only-adm",
    "only-administrator",
    "only-administrators",
    "only-admins",
    "so-adm",
    "so-admin",
    "so-administrador",
    "so-administradores",
    "so-admins",
  ],
  usage: `${PREFIX}only-admin 1`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ args, sendReply, sendSuccessReact, remoteJid }) => {
    if (!args.length) {
      throw new InvalidParameterError(
        "Anda perlu mengetik 1 atau 0 (aktifkan atau nonaktifkan)!"
      );
    }

    const onlyAdminOn = args[0] === "1";
    const onlyAdminOff = args[0] === "0";

    if (!onlyAdminOn && !onlyAdminOff) {
      throw new InvalidParameterError(
        "Anda perlu mengetik 1 atau 0 (aktifkan atau nonaktifkan)!"
      );
    }

    const hasActive = onlyAdminOn && isActiveOnlyAdmins(remoteJid);
    const hasInactive = onlyAdminOff && !isActiveOnlyAdmins(remoteJid);

    if (hasActive || hasInactive) {
      throw new WarningError(
        `Fitur hanya admin yang menggunakan perintah saya sudah ${
          onlyAdminOn ? "diaktifkan" : "dinonaktifkan"
        }!`
      );
    }

    if (onlyAdminOn) {
      activateOnlyAdmins(remoteJid);
    } else {
      deactivateOnlyAdmins(remoteJid);
    }

    await sendSuccessReact();

    const context = onlyAdminOn ? "diaktifkan" : "dinonaktifkan";

    await sendReply(
      `Fitur hanya admin yang menggunakan perintah saya ${context} dengan sukses!`
    );
  },
};
