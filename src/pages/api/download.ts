// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    record1: {
      name: "Product 1",
      description: "Example description",
      status: "Online",
      color: "green",
      key: "record1",
    },
    record2: {
      name: "Product 2",
      description: "Here is example Description 2",
      status: "Offline",
      color: "red",
      key: "record2",
    },
    record3: {
      name: "Product 3",
      description: "Here is more info",
      status: "Connecting",
      color: "yellow",
      key: "record3",
    },
  });
}
