import type { VercelRequest, VercelResponse } from "@vercel/node";

const users = new Map<number, any>();

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { telegramId, firstName, avatar } = req.body;

  let user = users.get(telegramId);

  if (!user) {
    user = {
      telegramId,
      firstName,
      avatar,
      balance: 0,
      energy: 100
    };
    users.set(telegramId, user);
  }

  res.json(user);
}
