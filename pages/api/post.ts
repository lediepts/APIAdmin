import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  switch (method) {
    case "POST":
      try {
        const { name } = body;
        if (name !== "diep") {
          res.status(200).send({
            error: true,
            message: "お名前は正しくありません。",
          });
          return;
        }
        res.status(200).json({
          error: false,
          data: body,
        });
      } catch (error) {
        console.log(error)
        res.status(500).send("server has error");
      }
      break;
    default:
      res.status(404).send({
        error: true,
        message: `${method} is not support`,
      });
      break;
  }
}
