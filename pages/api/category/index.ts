import { NextApiRequest, NextApiResponse } from "next";
import { checkAPIKey } from "../../../lib/checkAPIkey";
import dbConnect from "../../../lib/dbConnect";
import CategorySchema from "../../../models/category";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
  } catch (error) {
    res.status(500).send(error.message);
    res.end();
    return;
  }
  const {
    method,
    query: { parentId },
    headers: { "x-api-key": apiKey },
  } = req;
let isAuth=checkAPIKey(apiKey)
  switch (method) {
    case "GET":
      try {
        if (!isAuth) {
          res.status(403).end();
          return;
        }
        let option = parentId
          ? {
              parentId: parentId,
            }
          : {};
        const category = await CategorySchema.find(option).limit(
          500
        ); /* find all the data in our database */
        res.status(200).json(category);
      } catch (error) {
        res.status(500).send(error.message);
      }
      break;
    case "POST":
      try {
        const { parentId, en, vi, ja } = req.body;
        if (!en) res.status(400).end();
        const category = await CategorySchema.create({
          parentId,
          en,
          vi,
          ja,
        });
        res.status(201).json(category);
      } catch (error) {
        res.status(400).send(error.message);
        res.end();
      }
      break;
    default:
      res.status(500).end();
      break;
  }
}
