import { NextApiRequest, NextApiResponse } from 'next';

let emails: string[] = []; // Replace with your database connection

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(emails);
  } else if (req.method === 'POST') {
    const { email } = req.body;
    if (email && !emails.includes(email)) {
      emails.push(email);
      res.status(201).json({ email });
    } else {
      res.status(400).json({ error: 'Invalid or duplicate email' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
