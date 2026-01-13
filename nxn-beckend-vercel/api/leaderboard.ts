import type { VercelRequest, VercelResponse } from "@vercel/node";

const users = new Map<number, any>();

export default function handler(_: VercelRequest, res: VercelResponse) {
  const list = Array.from(users.values())
    .sort((a, b) => b.balance - a.balance)
    .slice(0, 10);

  res.json(list);
}
