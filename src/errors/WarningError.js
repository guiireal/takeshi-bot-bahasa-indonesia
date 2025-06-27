/**
 * Kelas error kustom untuk
 * peringatan.
 *
 * @author Dev Gui
 */
class WarningError extends Error {
  constructor(message) {
    super(message);
    this.name = "WarningError";
  }
}

module.exports = {
  WarningError,
};
