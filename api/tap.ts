import type { VercelRequest, VercelResponse } from "@vercel/node";

const users = new Map<number, any>();

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { telegramId } = req.body;

  if (!telegramId) {
    return res.status(400).json({ error: "telegramId required" });
  }

  if (!users.has(telegramId)) {
    users.set(telegramId, {
      telegramId,
      balance: 0,
      energy: 100
    });
  }

  const user = users.get(telegramId);

  if (user.energy > 0) {
    user.balance += 1;
    user.energy -= 1;
  }

  return res.status(200).json(user);
}
