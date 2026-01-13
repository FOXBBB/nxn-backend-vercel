export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { telegramId } = req.body;

  if (!telegramId) {
    return res.status(400).json({ error: "telegramId required" });
  }

  global.users = global.users || new Map();

  if (!global.users.has(telegramId)) {
    global.users.set(telegramId, {
      telegramId,
      balance: 0,
      energy: 100
    });
  }

  const user = global.users.get(telegramId);

  if (user.energy > 0) {
    user.balance += 1;
    user.energy -= 1;
  }

  return res.status(200).json(user);
}
