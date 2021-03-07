import axiosClient from "lib/axiosClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body: { url },
    query: { uri },
  } = req;
  switch (method) {
    case "GET":
      try {
        const resp = await axiosClient(`${uri}`.replace(/"/g, ""));
        res.status(200).json(resp);
      } catch (error) {
        res.status(500).send({ error });
      }
      break;
    case "POST":
      try {
        const resp = await axiosClient(`${url}`.replace(/"/g, ""));
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
