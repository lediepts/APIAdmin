import axiosClient from "lib/axiosClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { url },
  } = req;
  switch (method) {
    case "POST":
      try {
        const resp = await axiosClient(`${url}`);
        res.status(200).json(resp);
      } catch (error) {
        res.status(500).send({ error });
      }
      break;
    default:
      res.status(500).send(`${method} is not support!`);
      break;
  }
}
