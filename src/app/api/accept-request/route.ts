import { acceptRequest } from "@/app/actions/requestActions";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { requestId } = req.body;
    const request = await acceptRequest(requestId);
    res.status(200).json(request);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}