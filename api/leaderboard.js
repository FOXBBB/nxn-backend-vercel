export default function handler(req, res) {
  global.users = global.users || new Map();

  const list = Array.from(global.users.values())
    .sort((a, b) => b.balance - a.balance)
    .slice(0, 10);

  res.status(200).json(list);
}
