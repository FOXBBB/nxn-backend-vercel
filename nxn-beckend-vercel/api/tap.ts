import type { VercelRequest, VercelResponse } from "@vercel/node";

const users = new Map<number, any>();

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { telegramId } = req.body;

  const user = users.get(telegramId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (user.energy <= 0) {
    return res.json(user);
  }

  user.balance += 1;
  user.energy -= 1;

  res.json(user);
}
