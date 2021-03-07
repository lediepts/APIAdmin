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
    case "GET":
      try {
        const { data } = await axiosClient.get(`${url}`);
        res.status(200).json(data);
      } catch (error) {
        res.status(500).send({ error });
      }
      break;
    default:
      res.status(500).end();
      break;
  }
}
