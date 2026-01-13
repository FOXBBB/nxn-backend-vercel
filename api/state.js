export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { telegramId, firstName, avatar } = req.body;

  if (!telegramId) {
    return res.status(400).json({ error: "telegramId required" });
  }

  global.users = global.users || new Map();

  if (!global.users.has(telegramId)) {
    global.users.set(telegramId, {
      telegramId,
      firstName,
      avatar,
      balance: 0,
      energy: 100
    });
  }

  return res.status(200).json(global.users.get(telegramId));
}
