import { NextApiRequest, NextApiResponse } from "next";
import { checkAPIKey } from "../../../lib/checkAPIKey";
import dbConnect from "../../../lib/dbConnect";
import ContentsSchema from "../../../models/contents";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
  } catch (error) {
    res.status(500).send({ error });
    res.end();
    return;
  }
  const {
    method,
    query: { parentId },
    headers: { "x-api-key": apiKey },
  } = req;
  let isAuth = checkAPIKey(apiKey);
  switch (method) {
    case "GET":
      try {
        if (!isAuth) {
          res.status(403).end();
          return;
        }
        let option = parentId
          ? {
              categoryId: parentId,
            }
          : {};
        const category = await ContentsSchema.find(option).limit(
          500
        ); /* find all the data in our database */
        res.status(200).json(category);
      } catch (error) {
        res.status(500).send({ error });
      }
      break;
    case "POST":
      try {
        const { categoryId, title, description } = req.body;
        if (!title.en || !description.en) return res.status(400).end();
        const content = await ContentsSchema.create({
          categoryId,
          title,
          description,
        }).catch(() => {
          return res.status(400).send(`incorrect input`);
        });
        res.status(201).json(content);
      } catch (error) {
        res.status(400).send({ error });
        res.end();
      }
      break;
    default:
      res.status(500).end();
      break;
  }
}
