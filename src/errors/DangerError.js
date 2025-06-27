/**
 * Kelas error kustom untuk error kritis.
 *
 * @author Dev Gui
 */
class DangerError extends Error {
  constructor(message) {
    super(message);
    this.name = "DangerError";
  }
}

module.exports = {
  DangerError,
};
