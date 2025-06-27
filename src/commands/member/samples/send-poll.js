const { PREFIX } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");

module.exports = {
  name: "send-poll",
  description: "Contoh cara mengirim polling/pemungutan suara di grup",
  commands: ["send-poll"],
  usage: `${PREFIX}send-poll`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendPoll, sendReply, sendReact }) => {
    await sendReact("📊");

    await delay(2000);

    await sendPoll(
      "Polling pilihan tunggal: Mana opsi favorit Anda?",
      [
        { optionName: "Opsi 1" },
        { optionName: "Opsi 2" },
        { optionName: "Opsi 3" },
      ],
      true
    );

    await delay(2000);

    await sendPoll(
      "Polling pilihan ganda: Makanan apa yang Anda suka?",
      [
        { optionName: "Pizza 🍕" },
        { optionName: "Burger 🍔" },
        { optionName: "Sushi 🍣" },
        { optionName: "Salad 🥗" },
        { optionName: "Es Krim 🍦" },
      ],
      false
    );

    await delay(2000);

    await sendReply(
      "Anda bisa membuat polling sendiri dengan mudah menggunakan fungsi sendPoll(title, options, singleChoice)."
    );
  },
};
