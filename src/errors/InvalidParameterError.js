/**
 * Kelas error kustom untuk
 * parameter yang tidak valid.
 *
 * @author Dev Gui
 */
class InvalidParameterError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidParameterError";
  }
}

module.exports = {
  InvalidParameterError,
};
